from django.db import models
from .common import Common


class CourseInstance(Common):
    """
    An "instance" of a course.
     - A course "instance" is a course offered in a particular semester by (a) professor(s).
     - Contains details specific to each course instance, including all grade tracking, section number, and more.

    Attributes:
        grading_strategy: Grading strategy for the course (total point-based or weight-based)
        min_a: Minimum number of points/score to get an 'A' in the course
        min_b: Minimum number of points/score to get an 'B' in the course
        min_c: Minimum number of points/score to get an 'C' in the course
        min_d: Minimum number of points/score to get an 'D' in the course
        max_points: Maximum number of points attainable (if course is point-based)
        section: Course section number
        course: Associated course
        semester: Semester in which the course is offered
        students: Students in the course
    """

    # Grading strategies
    POINT_BASED = 'point_based'
    WEIGHT_BASED = 'weight_based'
    GRADING_STRATEGIES = (POINT_BASED, WEIGHT_BASED)
    GRADING_STRATEGY_OPTIONS = [
        (POINT_BASED, 'Point Based'),
        (WEIGHT_BASED, 'Weight Based')
    ]

    grading_strategy = models.CharField(
        max_length=20,
        null=False,
        verbose_name='Grading Strategy',
        choices=GRADING_STRATEGY_OPTIONS,
        default=WEIGHT_BASED,
        blank=True
    )
    min_a = models.FloatField(
        null=False,
        verbose_name='Minimum \'A\' Score',
        help_text='Minimum score to get an \'A\''
    )
    min_b = models.FloatField(
        null=False,
        verbose_name='Minimum \'B\' Score',
        help_text='Minimum score to get a \'B\''
    )
    min_c = models.FloatField(
        null=False,
        verbose_name='Minimum \'C\' Score',
        help_text='Minimum score to get a \'C\''
    )
    min_d = models.FloatField(
        null=False,
        verbose_name='Minimum \'D\' Score',
        help_text='Minimum score to get a \'D\''
    )
    max_points = models.FloatField(null=True, verbose_name='Maximum number of points attainable', blank=True)
    section = models.PositiveSmallIntegerField(null=False, verbose_name='Section Number')
    course = models.ForeignKey(
        to='Course',
        on_delete=models.CASCADE,
        related_name='course_instances',
        null=False,
        verbose_name='Course'
    )
    semester = models.ForeignKey(
        to='Semester',
        on_delete=models.CASCADE,
        related_name='course_instances',
        null=False,
        verbose_name='Semester'
    )
    students = models.ManyToManyField(to='grades.User', related_name='course_instances')

    def __str__(self) -> str:
        return f'{self.course} - Section {self.section} - {self.semester}'
