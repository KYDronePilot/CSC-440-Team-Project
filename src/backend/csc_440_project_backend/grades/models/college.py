from django.db import models
from grades.models import Common


class College(Common):
    """
    A college with which everything (majors, concentrations, courses, etc.) are associated with.

    Attributes:
        name: Name of the college
        location: Description of the college's location
    """

    name = models.CharField(max_length=50, null=False)
    location = models.CharField(max_length=70, null=False)

    def __str__(self) -> str:
        return f'{self.name}, {self.location}'
