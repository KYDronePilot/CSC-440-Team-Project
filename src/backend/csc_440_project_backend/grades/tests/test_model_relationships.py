from django.test import TestCase
from grades.models import Category, CategoryScoreRequirement, College, Concentration, ConcentrationCourse, Course, \
    CourseInstance, GradeEntry, Major, Semester, User


class TestModelRelationships(TestCase):
    """
    Test the relationships between models
     - And also provide some dummy record creation statements that can be used elsewhere.
    """
    def setUp(self) -> None:
        self.create_users()
        self.create_colleges()

    def create_users(self):
        """
        Create dummy users.
        """

        self.student_john = User.objects.create(
            first_name='John',
            last_name='Doe',
            username='john.doe',
            email='john.doe@gmail.com',
            password='somesecurepassword'
        )
        self.student_jane = User.objects.create(
            first_name='Jane',
            last_name='Doe',
            username='jane.doe',
            email='jane.doe@gmail.com',
            password='somereallysecurepassword'
        )
        self.student_william = User.objects.create(
            first_name='William',
            last_name='Smith',
            username='william.smith',
            email='william.smith@gmail.com',
            password='somereallyreallysecurepassword'
        )
        self.the_admin = User.objects.create(
            first_name='Admin',
            last_name='Person',
            username='theadmin',
            email='admin@gmail.com',
            password='anadminpassword',
            is_superuser=True
        )

    def create_colleges(self):
        """
        Create dummy colleges.
        """

        self.eku = College.objects.create(name='Eastern Kentucky University', location='Richmond, KY')
        self.uk = College.objects.create(name='University of Kentucky', location='Lexington, KY')

    def test_college_student_relationship(self):
        self.eku.students.add(self.student_john)
        self.eku.students.add(self.student_jane)
        self.eku.students.add(self.student_william)
        self.uk.students.add(self.student_william)

        self.assertCountEqual(
            list(self.eku.students.all()),
            [
                self.student_william,
                self.student_john,
                self.student_jane
            ]
        )
        self.assertCountEqual(
            list(self.uk.students.all()),
            [self.student_william]
        )

        self.assertCountEqual(
            list(self.student_john.colleges.all()),
            [self.eku]
        )
        self.assertCountEqual(
            list(self.student_william.colleges.all()),
            [self.eku, self.uk]
        )
