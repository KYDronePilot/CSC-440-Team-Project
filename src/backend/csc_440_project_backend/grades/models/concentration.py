from django.db import models
from grades.models import Common


class Concentration(Common):
    """
    A major concentration.

    Attributes:
       name: Name of concentration
       major: Associated major
    """

    name = models.CharField(max_length=50, null=False, verbose_name='Name')
    major = models.ForeignKey(
        to='Major',
        on_delete=models.CASCADE,
        related_name='concentrations',
        verbose_name='Major',
        null=False
    )

    def __str__(self) -> str:
        return f'{self.name} concentration, {self.major}'
