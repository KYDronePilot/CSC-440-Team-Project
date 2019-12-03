from typing import Union, Dict

from django.db import models
from django.db.models import QuerySet

from grades.models.course import is_completed
from .common import Common


class Requirement(Common):
    """
    Requirement for a concentration or a sub-requirement for another requirement.

    Attributes:
        name: Name of requirement
        concentration: Concentration the requirement is for (if not a sub-requirement)
        course_count: Number of related courses that must be completed
        super_requirement: A larger requirement which this requirement is a part of
        sub_requirement_count: Number of sub-requirements that must be completed
        sub_requirement_course_count: Number of courses in directly related sub-requirements that must be completed
            in addition to courses in sub-requirements that must be fulfilled
        is_required: Whether this requirement is absolutely required
            Used when the requirement is one of many related to a super requirement which only needs a set number of the
            sub-requirements to be completed.
    """

    name = models.CharField(max_length=100, null=False, verbose_name='Name')
    concentration = models.ForeignKey(
        to='Concentration',
        on_delete=models.CASCADE,
        related_name='requirements',
        null=True,
        verbose_name='Concentration',
        help_text='Concentration the requirement is for (only if root requirement)',
        blank=True
    )
    course_count = models.PositiveSmallIntegerField(
        null=True,
        verbose_name='Course Count',
        help_text='Number of directly related courses that must be completed to fulfill the requirement',
        blank=True
    )
    super_requirement = models.ForeignKey(
        to='Requirement',
        on_delete=models.CASCADE,
        related_name='sub_requirements',
        null=True,
        verbose_name='Parent Requirement',
        help_text='Parent requirement which this requirement is a sub-requirement of (if sub-requirement)',
        blank=True
    )
    sub_requirement_count = models.PositiveSmallIntegerField(
        null=True,
        verbose_name='Sub Requirement Count',
        help_text='Number of sub-requirements which must be completed to fulfill the requirement',
        blank=True
    )
    sub_requirement_course_count = models.PositiveSmallIntegerField(
        null=True,
        verbose_name='Sub Requirement Course Count',
        help_text='Number of courses in directly related sub-requirements that must be completed to fulfill the '
                  'requirement (including courses in sub-requirements that must be fulfilled)',
        blank=True
    )
    is_required = models.BooleanField(
        null=False,
        verbose_name='Required',
        help_text='Set to false when requirement is one of many sub-requirements which do not all need to be completed',
        blank=True,
        default=True
    )

    def __str__(self) -> str:
        if self.super_requirement is not None:
            return f'{self.name} - Parent: {self.super_requirement.name}'
        return self.name


def is_requirement_sub_requirement(requirement: Requirement) -> bool:
    """
    Check whether a requirement is a sub-requirement.

    Args:
        requirement: Requirement instance

    Returns:
        Whether the requirement is a sub-requirement
    """
    return requirement.super_requirement is not None


def get_course_instances(requirement: Requirement) -> QuerySet:
    """
    Get all course instances of courses directly related to a requirement.

    Args:
        requirement: Requirement instance

    Returns:
        Course instances of courses directly related to the requirement
    """
    from grades.models import CourseInstance
    return CourseInstance.objects.filter(course__requirements=requirement)


def get_completed_courses(requirement: Requirement, student) -> QuerySet:
    """
    Get courses of a requirement that the student has completed.

    Args:
        requirement: Requirement instance
        student: Student who completed the courses

    Returns:
        Courses of the requirement completed by the student
    """
    from grades.models import Course

    course_instances = get_course_instances(requirement).filter(students=student)
    return Course.objects.filter(course_instances__in=course_instances)


def get_completed_sub_requirement_courses(requirement: Requirement, student) -> QuerySet:
    """
    Get courses that are completed in sub-requirements directly related to a requirement.

    Args:
        requirement: Requirement instance
        student: Student being checked

    Returns:
        Courses completed in sub-requirements directly related to the requirement
    """
    from grades.models import Course

    all_courses = Course.objects.filter(requirements__in=requirement.sub_requirements.all())
    return all_courses.filter(course_instances__students=student)


def are_course_requirements_fulfilled(requirement: Requirement, student) -> bool:
    """
    Check if course requirements directly related to a requirement are fulfilled.
    Returns True if no course count requirements.

    Args:
        requirement: Requirement instance
        student: Student being checked

    Returns:
        Whether the course requirements were fulfilled
    """
    if requirement.course_count is None:
        return True

    return get_completed_courses(requirement, student).count() >= requirement.course_count


def are_sub_requirements_fulfilled(requirement: Requirement, student) -> bool:
    """
    Check if sub-requirements of a requirement are fulfilled.

    Args:
        requirement: Requirement instance
        student: Student being checked

    Returns:
        Whether sub-requirements of a requirement are fulfilled
    """
    if requirement.sub_requirement_count is None:
        return True

    completed_count = 0
    for sub_requirement in requirement.sub_requirements.all():
        if is_requirement_fulfilled(sub_requirement, student):
            completed_count += 1

    return completed_count >= requirement.sub_requirement_count


def is_sub_requirement_course_count_fulfilled(requirement: Requirement, student) -> bool:
    """
    Check if the sub-requirement course count requirement of a requirement is fulfilled.

    Args:
        requirement: Requirement instance
        student: Student being checked

    Returns:
        Whether the sub-requirement course count requirement of a requirement is fulfilled
    """
    if requirement.sub_requirement_course_count is None:
        return True

    return (
            get_completed_sub_requirement_courses(requirement, student).count()
            >= requirement.sub_requirement_course_count
    )


def is_requirement_fulfilled(requirement: Requirement, student) -> bool:
    """
    Check if a requirement is fulfilled recursively.

    Args:
        requirement: Requirement instance
        student: Student being checked

    Returns:
        Whether the requirement is fulfilled or not
    """
    return (
            are_course_requirements_fulfilled(requirement, student)
            and are_sub_requirements_fulfilled(requirement, student)
            and is_sub_requirement_course_count_fulfilled(requirement, student)
    )


def get_requirements_structure(requirement: Requirement, student) -> Dict[str, Union[bool, list]]:
    """
    Get the structure of requirements and statuses recursively.
    Uses dicts and lists to produce a JSON representation. The
    structure is as follows:

        struct = {
            'name': 'Some Requirement',
            'fulfilled': True,
            'courses': [
                {
                    'name': 'Applied Software Engineering',
                    'code': 'CSC 440',
                    'credit_hours': 3,
                    'fulfilled': True
                }
            ],
            'sub_requirements': [
                {
                    'name': 'Some Sub-Requirement',
                    'fulfilled': True,
                    ...
                }
            ]
        }

    Returns:
        Requirement structure
    """
    return {
        'name': requirement.name,
        'fulfilled': is_requirement_fulfilled(requirement, student),
        'courses': [
            {
                'name': course.name,
                'code': course.code,
                'credit_hours': course.credit_hours,
                'fulfilled': is_completed(course, student)
            } for course in requirement.courses.order_by('code').all()
        ],
        'sub_requirements': [
            get_requirements_structure(requirement, student)
            for requirement in requirement.sub_requirements.order_by('name').all()
        ]
    }
