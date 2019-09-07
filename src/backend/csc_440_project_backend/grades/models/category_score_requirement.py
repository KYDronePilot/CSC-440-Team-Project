from django.db import models
from .common import Common


class CategoryScoreRequirement(Common):
    """
    Extra, category-based score requirements.
     - Used when, in addition to getting an overall score in a course for a particular letter grade, the student must
       also get a score in each of some specified grading categories to get that letter grade.

    Attributes:
        min_a: Minimum number of points/score in each related category to get an 'A' in the course
        min_b: Minimum number of points/score in each related category to get an 'B' in the course
        min_c: Minimum number of points/score in each related category to get an 'C' in the course
        min_d: Minimum number of points/score in each related category to get an 'D' in the course
        course_instance: Course instance this requirement is a part of
    """

    min_a = models.FloatField(
        null=False,
        verbose_name='Minimum \'A\' Score',
        help_text='Minimum score in each category to get an \'A\''
    )
    min_b = models.FloatField(
        null=False,
        verbose_name='Minimum \'B\' Score',
        help_text='Minimum score in each category to get a \'B\''
    )
    min_c = models.FloatField(
        null=False,
        verbose_name='Minimum \'C\' Score',
        help_text='Minimum score in each category to get a \'C\''
    )
    min_d = models.FloatField(
        null=False,
        verbose_name='Minimum \'D\' Score',
        help_text='Minimum score in each category to get a \'D\''
    )
    course_instance = models.ForeignKey(
        to='CourseInstance',
        on_delete=models.CASCADE,
        related_name='category_score_requirements',
        null=False,
        verbose_name='Course Instance'
    )

    def __str__(self) -> str:
        return f'Requirement on {", ".join(self.categories.all())} of course {self.course_instance}'
