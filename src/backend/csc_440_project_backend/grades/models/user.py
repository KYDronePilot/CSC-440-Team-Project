from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """
    An extension of the default user class with additional attributes.
     - It seems like this class should be named "Student", but then all user accounts would be students,
       including admins.

    Attributes:
        colleges: Colleges a student is a part of
        majors: Majors a student is in
        concentrations: Concentrations a student is in
        semesters: Semesters a student is enrolled in
    """

    colleges = models.ManyToManyField(to='College', related_name='students')
    majors = models.ManyToManyField(to='Major', related_name='students')
    concentrations = models.ManyToManyField(to='Concentration', related_name='students')
    semesters = models.ManyToManyField(to='Semester', related_name='students')
