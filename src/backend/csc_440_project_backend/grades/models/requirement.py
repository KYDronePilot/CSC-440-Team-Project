from django.db import models
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
        help_text='Concentration the requirement is for (if not a sub-requirement)'
    )
    course_count = models.PositiveSmallIntegerField(
        null=True,
        verbose_name='Course Count',
        help_text='Number of directly related courses that must be completed to fulfill the requirement'
    )
    super_requirement = models.ForeignKey(
        to='Requirement',
        on_delete=models.CASCADE,
        related_name='sub_requirements',
        null=True,
        verbose_name='Parent Requirement',
        help_text='Parent requirement which this requirement is a sub-requirement of (if sub-requirement)'
    )
    sub_requirement_count = models.PositiveSmallIntegerField(
        null=True,
        verbose_name='Sub Requirement Count',
        help_text='Number of sub-requirements which must be completed to fulfill the requirement'
    )
    sub_requirement_course_count = models.PositiveSmallIntegerField(
        null=True,
        verbose_name='Sub Requirement Course Count',
        help_text='Number of courses in directly related sub-requirements that must be completed to fulfill the '
                  'requirement'
    )
    is_required = models.BooleanField(
        null=False,
        verbose_name='Required',
        help_text='Set to false when requirement is one of many sub-requirements which do not all need to be completed'
    )

    def is_sub_requirement(self) -> bool:
        """
        Check whether requirement is a sub-requirement.

        Returns:
            Whether the requirement is a sub-requirement
        """

        return self.super_requirement is not None

    def __str__(self):
        requirement_type = 'Sub-requirement' if self.is_sub_requirement() else 'Requirement'
        return (
            f'{requirement_type}: Courses: {list(self.courses.all())}, '
            f'Sub-requirements: {list(self.sub_requirements.all())}'
        )
