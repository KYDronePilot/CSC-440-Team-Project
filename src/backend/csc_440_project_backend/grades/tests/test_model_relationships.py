from django.test import TestCase
from grades.models import Category, CategoryScoreRequirement, College, Concentration, Course, CourseInstance, \
    GradeEntry, Major, Semester, User, Requirement


class TestModelRelationships(TestCase):
    """
    Test the relationships between models
     - And also provide some dummy record creation statements that can be used elsewhere.
    """
    def setUp(self) -> None:
        self.create_users()
        self.create_colleges()
        self.create_college_user_relationships()
        self.create_majors()
        self.create_major_user_relationships()
        self.create_concentrations()
        self.create_concentration_user_relationships()

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

    def create_college_user_relationships(self):
        """
        Create relationships between colleges and users.
        """

        self.eku.students.add(self.student_john)
        self.eku.students.add(self.student_jane)
        self.eku.students.add(self.student_william)
        self.uk.students.add(self.student_william)

    def create_majors(self):
        """
        Create dummy majors.
        """

        self.computer_science = Major.objects.create(
            name='Computer Science',
            college=self.eku
        )
        self.forensic_science = Major.objects.create(
            name='Forensic Science',
            college=self.eku
        )
        self.physics = Major.objects.create(
            name='Physics',
            college=self.eku
        )

    def create_major_user_relationships(self):
        self.student_william.majors.add(self.computer_science)
        self.student_john.majors.add(self.computer_science)
        self.physics.students.add(self.student_jane)

    def create_concentrations(self):
        """
        Create dummy concentrations.
        """

        self.cs_general = Concentration.objects.create(
            name='General',
            major=self.computer_science
        )
        self.cs_computer_technology = Concentration.objects.create(
            name='Computer Technology',
            major=self.computer_science
        )
        self.cs_multimedia = Concentration.objects.create(
            name='Interactive Multimedia',
            major=self.computer_science
        )
        self.cs_ai_in_data_science = Concentration.objects.create(
            name='Artificial Intelligence in Data Science',
            major=self.computer_science
        )
        self.phy_general = Concentration.objects.create(
            name='General',
            major=self.physics
        )
        self.fs_general = Concentration.objects.create(
            name='General',
            major=self.forensic_science
        )

    def create_concentration_user_relationships(self):
        self.student_william.concentrations.add(self.cs_general)
        self.student_john.concentrations.add(self.cs_ai_in_data_science)
        self.fs_general.students.add(self.student_jane)

    def create_requirements_and_sub_requirements(self):
        self.csg_gen_ed_req = Requirement.objects.create(
            name='General Education & University Requirements',
            concentration=self.cs_general,
            course_count=1,
            is_required=True
        )
        self.csg_core_course_req = Requirement.objects.create(
            name='Core Course Requirements',
            concentration=self.cs_general,
            course_count=9,
            is_required=True
        )
        self.csg_concentration_req = Requirement.objects.create(
            name='Computer Science (General) Concentration Requirements',
            concentration=self.cs_general,
            course_count=8,
            is_required=True
        )
        self.csg_concentration_sub_req = Requirement.objects.create(
            name='Plus One (1) Hour Selected from',
            course_count=1,
            super_requirement=self.csg_concentration_req,
            is_required=True
        )

    def test_college_student_relationships(self):
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

    def test_major_user_relationships(self):
        self.assertCountEqual(
            list(self.computer_science.students.all()),
            [
                self.student_william,
                self.student_john
            ]
        )
        self.assertCountEqual(
            list(self.student_jane.majors.all()),
            [self.physics]
        )

    def test_college_major_relationships(self):
        self.assertCountEqual(
            list(self.eku.majors.all()),
            [
                self.computer_science,
                self.forensic_science,
                self.physics
            ]
        )
        self.assertEqual(
            self.computer_science.college,
            self.eku
        )

    def test_concentration_user_relationships(self):
        self.assertCountEqual(
            list(self.cs_general.students.all()),
            [self.student_william]
        )
        self.assertCountEqual(
            list(self.student_john.concentrations.all()),
            [self.cs_ai_in_data_science]
        )

    def test_major_concentration_relationships(self):
        self.assertCountEqual(
            list(self.computer_science.concentrations.all()),
            [
                self.cs_general,
                self.cs_computer_technology,
                self.cs_multimedia,
                self.cs_ai_in_data_science
            ]
        )
        self.assertEqual(
            self.fs_general.major,
            self.forensic_science
        )
