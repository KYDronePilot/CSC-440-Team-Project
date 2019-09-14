from django.db import models
from .common import Common


def validate_season(season: str) -> bool:
    """
    Check whether a season is valid.

    Args:
        season: Season value to validate

    Returns:
        Whether the season is valid
    """

    return season in Semester.SEASONS


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
        validators=[validate_season]
    )
    colleges = models.ManyToManyField(to='College', related_name='semesters')

    def __str__(self) -> str:
        return f'{self.season}, {self.year}'
