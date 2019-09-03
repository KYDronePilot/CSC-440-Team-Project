from django.db import models
from grades.models import Common


class Course(Common):
    """
    A course that students can take.
     - This is the base definition of a course and has multiple course instances (courses that are taught).

     Attributes:
         code: The course code (e.g. CSC 190)
         name: Name of the course
         credit_hours: Credit hours of the course
         is_deprecated: Whether the course is no longer offered
         concentrations: Concentrations the course is a part of
    """

    code = models.CharField(max_length=20, null=False, verbose_name='Course Code')
    name = models.CharField(max_length=50, null=False, verbose_name='Name')
    credit_hours = models.FloatField(null=False, verbose_name='Credit Hours')
    is_deprecated = models.BooleanField(default=False, null=False, verbose_name='Is Deprecated')
    concentrations = models.ManyToManyField(to='Concentration', through='ConcentrationCourse', related_name='courses')

    def __str__(self):
        return f'{self.code}{", deprecated" if self.is_deprecated else ""}'
