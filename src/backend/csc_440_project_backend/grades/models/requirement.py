from typing import Union, Dict

from django.db import models
from django.db.models import QuerySet

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

    def is_sub_requirement(self) -> bool:
        """
        Check whether requirement is a sub-requirement.

        Returns:
            Whether the requirement is a sub-requirement
        """
        return self.super_requirement is not None

    @property
    def course_instances(self) -> QuerySet:
        """
        All course instances of directly related courses.
        """
        from grades.models import CourseInstance
        return CourseInstance.objects.filter(course__requirements=self)

    def get_completed_courses(self, student) -> QuerySet:
        """
        Get courses that the student has completed.

        Args:
            student: Student who completed the courses

        Returns:
            Courses completed by the student
        """
        from grades.models import Course

        course_instances = self.course_instances.filter(students=student)
        return Course.objects.filter(course_instances__in=course_instances)

    def get_completed_sub_requirement_courses(self, student) -> QuerySet:
        """
        Get courses that are completed in directly related sub-requirements.

        Args:
            student: Student being checked

        Returns:
            Courses completed in directly related sub-requirements
        """
        from grades.models import Course

        all_courses = Course.objects.filter(requirements__in=self.sub_requirements.all())
        return all_courses.filter(course_instances__students=student)

    def are_course_requirements_fulfilled(self, student) -> bool:
        """
        Check if directly related course requirements are fulfilled.
        Returns True if no course count requirements.

        Args:
            student: Student being checked

        Returns:
            Whether the course requirements were fulfilled
        """
        if self.course_count is None:
            return True

        return self.get_completed_courses(student).count() >= self.course_count

    def are_sub_requirements_fulfilled(self, student) -> bool:
        """
        Check if sub-requirements are fulfilled.

        Args:
            student: Student being checked

        Returns:
            Whether sub-requirements are fulfilled
        """
        if self.sub_requirement_count is None:
            return True

        completed_count = 0
        for requirement in self.sub_requirements.all():
            if requirement.is_fulfilled(student):
                completed_count += 1

        return completed_count >= self.sub_requirement_count

    def is_sub_requirement_course_count_fulfilled(self, student) -> bool:
        """
        Check if the sub-requirement course count requirement is fulfilled.

        Args:
            student: Student being checked

        Returns:
            Whether the sub-requirement course count requirement is fulfilled
        """
        if self.sub_requirement_course_count is None:
            return True

        return self.get_completed_sub_requirement_courses(student).count() >= self.sub_requirement_course_count

    def is_fulfilled(self, student) -> bool:
        """
        Check if the requirement is fulfilled recursively.

        Returns:
            Whether the requirement is fulfilled or not
        """
        return (
                self.are_course_requirements_fulfilled(student)
                and self.are_sub_requirements_fulfilled(student)
                and self.is_sub_requirement_course_count_fulfilled(student)
        )

    def get_requirements_structure(self, student) -> Dict[str, Union[bool, list]]:
        """
        Get the structure of requirements recursively. Uses dicts and
        lists to produce a JSON representation. The structure is as
        follows:

            struct = {
                'fulfilled': True,
                'courses': [
                    {
                        'fulfilled': True,
                        'course': CourseInstance
                    }
                ],
                'sub_requirements': [
                    {
                        'fulfilled': True,
                        ...
                    }
                ]
            }

        Returns:
            Requirement structure
        """
        return {
            'name': self.name,
            'fulfilled': self.is_fulfilled(student),
            'courses': [
                {
                    'name': course.name,
                    'code': course.code,
                    'credit_hours': course.credit_hours,
                    'fulfilled': course.is_completed(student)
                } for course in self.courses.order_by('code').all()
            ],
            'sub_requirements': [
                requirement.get_requirements_structure(student)
                for requirement in self.sub_requirements.order_by('name').all()
            ]
        }

    def __str__(self) -> str:
        if self.super_requirement is not None:
            return f'{self.name} - Parent: {self.super_requirement.name}'
        return self.name
