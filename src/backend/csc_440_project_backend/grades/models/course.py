from django.db import models
from .common import Common


class Course(Common):
    """
    A course that students can take.
     - This is the base definition of a course and has multiple course instances (courses that are taught).

     Attributes:
         code: The course code (e.g. CSC 190)
         name: Name of the course
         credit_hours: Credit hours of the course
         is_deprecated: Whether the course is no longer offered
         requirements: Requirements/sub-requirements the course is a part of
         is_gen_ed: Whether the course is a gen ed
    """

    code = models.CharField(max_length=20, null=False, verbose_name='Course Code')
    name = models.CharField(max_length=50, null=False, verbose_name='Name')
    credit_hours = models.FloatField(null=False, verbose_name='Credit Hours')
    is_deprecated = models.BooleanField(default=False, null=False, verbose_name='Is Deprecated')
    requirements = models.ManyToManyField(to='Requirement', related_name='courses', blank=True)
    is_gen_ed = models.BooleanField(
        null=False,
        verbose_name='Gen Ed',
        help_text='Whether the course is a general education requirement',
        default=False
    )

    def __str__(self):
        return f'{self.code}{", deprecated" if self.is_deprecated else ""}'

def is_completed(course, student):
    """
    Check if the course was completed by a student.

    Notes:
        TODO: This method should not be used. It is highly inefficient for course completion checking

    Args:
        student: Student to check

    Returns:
        Whether the student completed the course
    """
    return course.course_instances.filter(students=student).exists()