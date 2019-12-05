from django.db import models
from .common import Common


class Category(Common):
    """
    A grading category of a course (e.g. homework, exams, etc.).

    Attributes:
        name: Name of the category
        weight: Weight of the category if using a weight-based grading strategy
        max_points: Maximum number of points attainable in the category if using a point-based grading strategy
        course_instance: Course instance this category is a part of
        category_score_requirements: Category-based score requirements on this category

    See Also:
        grades.models.CategoryScoreRequirements has more information on how category-based score requirements work.
    """

    class Meta:
        verbose_name_plural = 'categories'

    name = models.CharField(max_length=50, null=False, verbose_name='Name')
    weight = models.FloatField(null=True, verbose_name='Weight')
    max_points = models.FloatField(null=True, verbose_name='Max Points', blank=True)
    course_instance = models.ForeignKey(
        to='CourseInstance',
        on_delete=models.CASCADE,
        related_name='categories',
        null=False
    )
    category_score_requirements = models.ManyToManyField(to='CategoryScoreRequirement', related_name='categories')

    def __str__(self) -> str:
        return f'"{self.name}" of {self.course_instance}'
