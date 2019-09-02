from django.db import models


class Semester(models.Model):
    """
    A semester in which a student is enrolled.

    Attributes:
        year: Year of the semester
        season: Season of the semester
        school_name: Name of school (optional, if student is not associated with a college)
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
    season = models.CharField(null=False, verbose_name='Season', choices=SEASON_CHOICES,
                              validators=[lambda season: season in Semester.SEASONS])
    school_name = models.CharField(max_length=50, null=True, verbose_name='School Name')
