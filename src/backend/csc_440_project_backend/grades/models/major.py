from django.db import models


class Major(models.Model):
    """
    A college major.

    Attributes:
        name: Name of major
    """

    name = models.CharField(max_length=50, null=False, verbose_name='Name')
    college = models.ForeignKey(to='College', on_delete=models.CASCADE, related_name='majors', verbose_name='College',
                                null=False)
