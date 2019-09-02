from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """
    An extension of the default user class with additional attributes.

    Attributes:
        college: College a student is a part of
        major: Major a student is in
        concentration: Concentration a student is in
    """

    college = models.ForeignKey(to='College', on_delete=models.SET_NULL, related_name='students',
                                verbose_name='College', null=True)
    major = models.ForeignKey(to='Major', on_delete=models.SET_NULL, related_name='students', verbose_name='Major',
                              null=True)
    concentration = models.ForeignKey(to='Concentration', on_delete=models.SET_NULL, related_name='students',
                                      verbose_name='Concentration', null=True)
