from django.db import models
from grades.models import Common


class Semester(Common):
    """
    A semester at a college.

    Attributes:
        year: Year of the semester
        season: Season of the semester
        college: Associated college
    """

    # Seasons of a semester
    FALL = 'fall'
    WINTER = 'winter'
    SPRING = 'spring'
    SUMMER = 'summer'
    SEASONS = [FALL, WINTER, SPRING, SUMMER]
    SEASON_CHOICES = [
        (FALL, 'Fall'),
        (WINTER, 'Winter'),
        (SPRING, 'Spring'),
        (SUMMER, 'Summer')
    ]

    year = models.SmallIntegerField(null=False, verbose_name='Year')
    season = models.CharField(
        max_length=20,
        null=False,
        verbose_name='Season',
        choices=SEASON_CHOICES,
        validators=[lambda season: season in Semester.SEASONS]
    )
    college = models.ForeignKey(
        to='College',
        on_delete=models.CASCADE,
        related_name='semesters',
        null=False,
        verbose_name='College'
    )

    def __str__(self) -> str:
        return f'{self.season}, {self.year}'
