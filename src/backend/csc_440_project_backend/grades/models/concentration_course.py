from django.db import models
from grades.models import Common


class ConcentrationCourse(Common):
    """
    Link table between concentrations and courses.

    Attributes:
        concentration: Link to concentration
        course: Link to course
        is_gen_ed: Whether the course is a gen ed
    """

    concentration = models.ForeignKey(
        to='Concentration',
        on_delete=models.CASCADE,
        null=False,
        verbose_name='Concentration'
    )
    course = models.ForeignKey(
        to='Course',
        on_delete=models.CASCADE,
        null=False,
        verbose_name='Course'
    )
    is_gen_ed = models.BooleanField(null=False, verbose_name='Is General Ed')

    def __str__(self) -> str:
        return f'{self.concentration} <-> {self.course}, is{"" if self.is_gen_ed else " not"} Gen Ed'
