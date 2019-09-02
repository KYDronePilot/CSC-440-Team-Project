from typing import ClassVar

from django.db import models


class College(models.Model):
    """
    A college with which everything (majors, concentrations, courses, etc.) are associated with.

    Attributes:
        name: Name of the college
        location: Description of the college's location
    """

    name = models.CharField(max_length=50, null=False)
    location = models.CharField(max_length=70, null=False)
