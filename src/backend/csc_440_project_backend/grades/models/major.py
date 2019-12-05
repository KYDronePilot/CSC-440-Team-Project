from django.db import models
from .common import Common


class Major(Common):
    """
    A college major.

    Attributes:
        name: Name of major
        college: College that the major is a part of
    """

    name = models.CharField(max_length=50, null=False, verbose_name='Name')
    college = models.ForeignKey(
        to='College',
        on_delete=models.CASCADE,
        related_name='majors',
        verbose_name='College',
        null=False
    )

    def __str__(self) -> str:
        return f'{self.name} - {self.college}'
