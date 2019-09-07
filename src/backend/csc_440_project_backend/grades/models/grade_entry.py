from django.db import models
from .common import Common


class GradeEntry(Common):
    """
    Individual grade entries.

    Attributes:
        name: Entry name
        points: Points obtained for the graded item
        max_points: Maximum number of points possible for the graded item
        student: Student who the entry belongs to
        category: Category that the entry is in
    """

    name = models.CharField(max_length=50, null=False, verbose_name='Name')
    points = models.FloatField(null=False, verbose_name='Points', help_text='Number of points obtained')
    max_points = models.FloatField(
        null=False,
        verbose_name='Max Points',
        help_text='Maximum number of points possible'
    )
    student = models.ForeignKey(
        to='grades.User',
        on_delete=models.CASCADE,
        related_name='grade_entries',
        null=False,
        verbose_name='Student'
    )
    category = models.ForeignKey(
        to='Category',
        on_delete=models.CASCADE,
        related_name='grade_entries',
        null=False,
        verbose_name='Category'
    )

    def __str__(self) -> str:
        return f'{self.name}, {self.points} out of {self.max_points}'
