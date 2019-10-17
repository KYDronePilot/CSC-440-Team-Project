from django.test import TestCase

from grades.models import Category, CategoryScoreRequirement, College, Concentration, Course, CourseInstance, \
    GradeEntry, Major, Semester, User, Requirement


class TestDatabaseSetup(TestCase):
    def setUp(self) -> None:
        self.create_users()
        self.create_colleges()
        self.create_college_user_relationships()
        self.create_majors()
        self.create_major_user_relationships()
        self.create_concentrations()
        self.create_concentration_user_relationships()
        self.create_requirements_and_sub_requirements()
        self.create_courses()
        self.create_requirement_course_relationships()
        self.create_semesters()
        self.create_college_semester_relationships()
        self.create_semester_user_relationships()
        self.create_course_instances()
        self.create_course_instance_user_relationships()
        self.create_category_score_requirements()
        self.create_categories()
        self.create_category_score_requirement_category_relationships()
        self.create_grade_entries()

    def create_users(self):
        """
        Create dummy users.
        """

        self.student_john = User.objects.create_user(
            first_name='John',
            last_name='Doe',
            username='john.doe',
            email='john.doe@gmail.com',
            password='somesecurepassword'
        )
        self.student_jane = User.objects.create_user(
            first_name='Jane',
            last_name='Doe',
            username='jane.doe',
            email='jane.doe@gmail.com',
            password='somereallysecurepassword'
        )
        self.student_william = User.objects.create_user(
            first_name='William',
            last_name='Smith',
            username='william.smith',
            email='william.smith@gmail.com',
            password='somereallyreallysecurepassword'
        )
        self.the_admin = User.objects.create_superuser(
            first_name='Admin',
            last_name='Person',
            username='theadmin',
            email='admin@gmail.com',
            password='anadminpassword'
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
            sub_requirement_count=1,
            is_required=True
        )
        self.csg_concentration_sub_req = Requirement.objects.create(
            name='Plus One (1) Hour Selected from',
            course_count=1,
            super_requirement=self.csg_concentration_req,
            is_required=True
        )
        self.csg_concentration_sup_req = Requirement.objects.create(
            name='Computer Science (General) Concentration Supporting Course Requirements',
            concentration=self.cs_general,
            course_count=5,
            sub_requirement_count=1,
            is_required=True
        )
        self.csg_concentration_sup_sub_req = Requirement.objects.create(
            name='Plus One (1) Of The Following Bracketed Physical Science Sequences',
            super_requirement=self.csg_concentration_sup_req,
            sub_requirement_count=1,
            sub_requirement_course_count=4,
            is_required=True
        )
        self.csg_concentration_sup_sub_1_req = Requirement.objects.create(
            name='Biology Sequence',
            course_count=2,
            super_requirement=self.csg_concentration_sup_sub_req,
            is_required=False
        )
        self.csg_concentration_sup_sub_2_req = Requirement.objects.create(
            name='Chemistry Sequence',
            course_count=2,
            super_requirement=self.csg_concentration_sup_sub_req,
            is_required=False
        )
        self.csg_concentration_sup_sub_3_req = Requirement.objects.create(
            name='Geology Sequence',
            course_count=2,
            super_requirement=self.csg_concentration_sup_sub_req,
            is_required=False
        )
        self.csg_concentration_sup_sub_4_req = Requirement.objects.create(
            name='Physics Sequence',
            course_count=2,
            super_requirement=self.csg_concentration_sup_sub_req,
            is_required=False
        )

    def create_courses(self):
        self.sco_100i = Course.objects.create(
            code='SCO 100I',
            name='Student Success Seminar for Computer Science',
            credit_hours=1.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_185 = Course.objects.create(
            code='CSC 185',
            name='Intro to Computer Concepts',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_190 = Course.objects.create(
            code='CSC 190',
            name='Object-Oriented Programming I',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_191 = Course.objects.create(
            code='CSC 191',
            name='Object-Oriented Programming II',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_195 = Course.objects.create(
            code='CSC 195',
            name='Intro to Discrete Structures',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_308 = Course.objects.create(
            code='CSC 308',
            name='Mobile App Dev for iOS',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_310 = Course.objects.create(
            code='CSC 310',
            name='Data Structures',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_313 = Course.objects.create(
            code='CSC 313',
            name='Database Systems',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_340 = Course.objects.create(
            code='CSC 340',
            name='Ethics & Software Engineering',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_499 = Course.objects.create(
            code='CSC 499',
            name='Computer Science Career Preparation',
            credit_hours=1.0,
            is_deprecated=False,
            is_gen_ed=False,
        )

        self.csc_311 = Course.objects.create(
            code='CSC 311',
            name='Algorithms I',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_320 = Course.objects.create(
            code='CSC 320',
            name='Introduction to Algorithms',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_360 = Course.objects.create(
            code='CSC 360',
            name='Computer Org and Architecture',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_400 = Course.objects.create(
            code='CSC 400',
            name='Operating Systems',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_440 = Course.objects.create(
            code='CSC 440',
            name='Applied Software Engineering',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_460 = Course.objects.create(
            code='CSC 460',
            name='Computer Network & System Administration',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_541 = Course.objects.create(
            code='CSC 541',
            name='Software Testing',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_545 = Course.objects.create(
            code='CSC 545',
            name='Theory of Database Systems',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )

        self.csc_494 = Course.objects.create(
            code='CSC 494',
            name='Innovative Problem Solving',
            credit_hours=1.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_495 = Course.objects.create(
            code='CSC 495',
            name='Independent Work',
            credit_hours=1.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.csc_496 = Course.objects.create(
            code='CSC 496',
            name='Senior Seminar',
            credit_hours=1.0,
            is_deprecated=False,
            is_gen_ed=False,
        )

        self.eet_252 = Course.objects.create(
            code='EET 252',
            name='Digital Electronics',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.mat_234 = Course.objects.create(
            code='MAT 234',
            name='Calculus I',
            credit_hours=4.0,
            is_deprecated=False,
            is_gen_ed=True,
        )
        self.mat_239 = Course.objects.create(
            code='MAT 239',
            name='Linear Algebra & Matrices',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.mat_244 = Course.objects.create(
            code='MAT 244',
            name='Calculus II',
            credit_hours=4.0,
            is_deprecated=False,
            is_gen_ed=False,
        )
        self.sta_270 = Course.objects.create(
            code='STA 270',
            name='Applied Statistics I',
            credit_hours=4.0,
            is_deprecated=False,
            is_gen_ed=True,
        )

        self.bio_111 = Course.objects.create(
            code='BIO 111',
            name='Cell and Molecular Biology',
            credit_hours=4.0,
            is_deprecated=False,
            is_gen_ed=True,
        )
        self.bio_112 = Course.objects.create(
            code='BIO 112',
            name='Ecology and Evolution',
            credit_hours=4.0,
            is_deprecated=False,
            is_gen_ed=True,
        )
        self.che_111 = Course.objects.create(
            code='CHE 111',
            name='General Chemistry I',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=True,
        )
        self.che_111l = Course.objects.create(
            code='CHE 111L',
            name='General Chemistry Lab I',
            credit_hours=1.0,
            is_deprecated=False,
            is_gen_ed=True,
        )
        self.che_112 = Course.objects.create(
            code='CHE 112',
            name='General Chemistry II',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=True,
        )
        self.che_112l = Course.objects.create(
            code='CHE 112L',
            name='General Chemistry Lab II',
            credit_hours=1.0,
            is_deprecated=False,
            is_gen_ed=True,
        )
        self.gly_108 = Course.objects.create(
            code='GLY 108',
            name='Plate Tectonics: The Active Earth',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=True,
        )
        self.gly_109 = Course.objects.create(
            code='GLY 109',
            name='Great Moments in Earth History',
            credit_hours=3.0,
            is_deprecated=False,
            is_gen_ed=True,
        )
        self.phy_201 = Course.objects.create(
            code='PHY 201',
            name='University Physics I',
            credit_hours=5.0,
            is_deprecated=False,
            is_gen_ed=True,
        )
        self.phy_202 = Course.objects.create(
            code='PHY 202',
            name='University Physics II',
            credit_hours=5.0,
            is_deprecated=False,
            is_gen_ed=True,
        )

    def create_requirement_course_relationships(self):
        self.sco_100i.requirements.add(self.csg_gen_ed_req)

        self.csc_185.requirements.add(self.csg_core_course_req)
        self.csc_190.requirements.add(self.csg_core_course_req)
        self.csc_191.requirements.add(self.csg_core_course_req)
        self.csc_195.requirements.add(self.csg_core_course_req)
        self.csc_308.requirements.add(self.csg_core_course_req)
        self.csc_310.requirements.add(self.csg_core_course_req)
        self.csc_313.requirements.add(self.csg_core_course_req)
        self.csc_340.requirements.add(self.csg_core_course_req)
        self.csc_499.requirements.add(self.csg_core_course_req)

        self.csc_311.requirements.add(self.csg_concentration_req)
        self.csc_320.requirements.add(self.csg_concentration_req)
        self.csc_360.requirements.add(self.csg_concentration_req)
        self.csc_400.requirements.add(self.csg_concentration_req)
        self.csc_440.requirements.add(self.csg_concentration_req)
        self.csc_460.requirements.add(self.csg_concentration_req)
        self.csc_541.requirements.add(self.csg_concentration_req)
        self.csc_545.requirements.add(self.csg_concentration_req)

        self.csc_494.requirements.add(self.csg_concentration_sub_req)
        self.csc_495.requirements.add(self.csg_concentration_sub_req)
        self.csc_496.requirements.add(self.csg_concentration_sub_req)

        self.eet_252.requirements.add(self.csg_concentration_sup_req)
        self.mat_234.requirements.add(self.csg_concentration_sup_req)
        self.mat_239.requirements.add(self.csg_concentration_sup_req)
        self.mat_244.requirements.add(self.csg_concentration_sup_req)
        self.sta_270.requirements.add(self.csg_concentration_sup_req)

        self.bio_111.requirements.add(self.csg_concentration_sup_sub_1_req)
        self.bio_112.requirements.add(self.csg_concentration_sup_sub_1_req)

        self.che_111.requirements.add(self.csg_concentration_sup_sub_2_req)
        self.che_111l.requirements.add(self.csg_concentration_sup_sub_2_req)

        self.che_112.requirements.add(self.csg_concentration_sup_sub_2_req)
        self.che_112l.requirements.add(self.csg_concentration_sup_sub_2_req)

        self.gly_108.requirements.add(self.csg_concentration_sup_sub_3_req)
        self.gly_109.requirements.add(self.csg_concentration_sup_sub_3_req)

        self.phy_201.requirements.add(self.csg_concentration_sup_sub_4_req)
        self.phy_202.requirements.add(self.csg_concentration_sup_sub_4_req)

    def create_semesters(self):
        self.spring_2019 = Semester.objects.create(
            year=2019,
            season=Semester.SPRING
        )
        self.fall_2019 = Semester.objects.create(
            year=2019,
            season=Semester.FALL
        )

    def create_college_semester_relationships(self):
        self.eku.semesters.add(self.spring_2019)
        self.eku.semesters.add(self.fall_2019)
        self.uk.semesters.add(self.spring_2019)
        self.uk.semesters.add(self.fall_2019)

    def create_semester_user_relationships(self):
        self.student_jane.semesters.add(self.fall_2019)
        self.student_john.semesters.add(self.fall_2019)
        self.student_william.semesters.add(self.fall_2019)
        self.student_john.semesters.add(self.spring_2019)
        self.student_william.semesters.add(self.spring_2019)

    def create_course_instances(self):
        self.csc_440_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_440,
            semester=self.fall_2019
        )
        self.sco_100i_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.sco_100i,
            semester=self.fall_2019
        )
        self.csc_185_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_185,
            semester=self.fall_2019
        )
        self.csc_190_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_190,
            semester=self.fall_2019
        )
        self.csc_191_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_191,
            semester=self.fall_2019
        )
        self.csc_195_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_195,
            semester=self.fall_2019
        )
        self.csc_308_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_308,
            semester=self.fall_2019
        )
        self.csc_310_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_310,
            semester=self.fall_2019
        )
        self.csc_313_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_313,
            semester=self.fall_2019
        )
        self.csc_340_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_340,
            semester=self.fall_2019
        )
        self.csc_499_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_499,
            semester=self.fall_2019
        )

        self.csc_311_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_311,
            semester=self.fall_2019
        )
        self.csc_320_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_320,
            semester=self.fall_2019
        )
        self.csc_360_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_360,
            semester=self.fall_2019
        )
        self.csc_400_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_400,
            semester=self.fall_2019
        )
        self.csc_460_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_460,
            semester=self.fall_2019
        )
        self.csc_541_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_541,
            semester=self.fall_2019
        )
        self.csc_545_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_545,
            semester=self.fall_2019
        )

        self.csc_494_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_494,
            semester=self.fall_2019
        )
        self.csc_495_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_495,
            semester=self.fall_2019
        )
        self.csc_496_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.csc_496,
            semester=self.fall_2019
        )

        self.eet_252_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.eet_252,
            semester=self.fall_2019
        )
        self.mat_234_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.mat_234,
            semester=self.fall_2019
        )
        self.mat_239_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.mat_239,
            semester=self.fall_2019
        )
        self.mat_244_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.mat_244,
            semester=self.fall_2019
        )
        self.sta_270_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.sta_270,
            semester=self.fall_2019
        )

        self.bio_111_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.bio_111,
            semester=self.fall_2019
        )
        self.bio_112_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.bio_112,
            semester=self.fall_2019
        )
        self.che_111_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.che_111,
            semester=self.fall_2019
        )
        self.che_111l_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.che_111l,
            semester=self.fall_2019
        )
        self.che_112_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.che_112,
            semester=self.fall_2019
        )
        self.che_112l_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.che_112l,
            semester=self.fall_2019
        )
        self.gly_108_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.gly_108,
            semester=self.fall_2019
        )
        self.gly_109_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.gly_109,
            semester=self.fall_2019
        )
        self.phy_201_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.phy_201,
            semester=self.fall_2019
        )
        self.phy_202_instance = CourseInstance.objects.create(
            grading_strategy=CourseInstance.WEIGHT_BASED,
            min_a=0.9,
            min_b=0.8,
            min_c=0.7,
            min_d=0.6,
            section=1,
            course=self.phy_202,
            semester=self.fall_2019
        )

    def create_course_instance_user_relationships(self):
        self.csc_440_instance.students.add(self.student_william)
        self.csc_440_instance.students.add(self.student_john)

    def create_category_score_requirements(self):
        self.csc_440_category_score_requirement = CategoryScoreRequirement.objects.create(
            min_a=0.8,
            min_b=0.7,
            min_c=0.6,
            min_d=0.6,
            course_instance=self.csc_440_instance
        )

    def create_categories(self):
        self.csc_440_assignments = Category.objects.create(
            name='5 Assignments',
            weight=0.2,
            course_instance=self.csc_440_instance
        )
        self.csc_440_exams = Category.objects.create(
            name='2 Exams',
            weight=0.25,
            course_instance=self.csc_440_instance
        )
        self.csc_440_individual_project = Category.objects.create(
            name='Individual Project',
            weight=0.2,
            course_instance=self.csc_440_instance
        )
        self.csc_440_team_project = Category.objects.create(
            name='Team Project',
            weight=0.35,
            course_instance=self.csc_440_instance
        )

    def create_category_score_requirement_category_relationships(self):
        self.csc_440_category_score_requirement.categories.add(self.csc_440_assignments)
        self.csc_440_category_score_requirement.categories.add(self.csc_440_exams)
        self.csc_440_category_score_requirement.categories.add(self.csc_440_individual_project)
        self.csc_440_category_score_requirement.categories.add(self.csc_440_team_project)

    def create_grade_entries(self):
        self.csc_440_assignment_1_william = GradeEntry.objects.create(
            name='Assignment 1',
            points=47,
            max_points=50,
            student=self.student_william,
            category=self.csc_440_assignments
        )
        self.csc_440_assignment_2_william = GradeEntry.objects.create(
            name='Assignment 2',
            points=90,
            max_points=100,
            student=self.student_william,
            category=self.csc_440_assignments
        )
        self.csc_440_assignment_3_william = GradeEntry.objects.create(
            name='Assignment 3',
            points=69,
            max_points=70,
            student=self.student_william,
            category=self.csc_440_assignments
        )
        self.csc_440_assignment_4_william = GradeEntry.objects.create(
            name='Assignment 4',
            points=8,
            max_points=10,
            student=self.student_william,
            category=self.csc_440_assignments
        )
        self.csc_440_assignment_5_william = GradeEntry.objects.create(
            name='Assignment 5',
            points=100,
            max_points=100,
            student=self.student_william,
            category=self.csc_440_assignments
        )

        self.csc_440_exam_1_william = GradeEntry.objects.create(
            name='Midterm Exam',
            points=96,
            max_points=100,
            student=self.student_william,
            category=self.csc_440_exams
        )
        self.csc_440_exam_2_william = GradeEntry.objects.create(
            name='Final Exam',
            points=89,
            max_points=100,
            student=self.student_william,
            category=self.csc_440_exams
        )

        self.csc_440_individual_project_william = GradeEntry.objects.create(
            name='Individual Project',
            points=85,
            max_points=100,
            student=self.student_william,
            category=self.csc_440_individual_project
        )
        self.csc_440_team_project_william = GradeEntry.objects.create(
            name='Team Project',
            points=99,
            max_points=100,
            student=self.student_william,
            category=self.csc_440_team_project
        )


class TestModelRelationships(TestDatabaseSetup):
    """
    Test the relationships between models
     - And also provide some dummy record creation statements that can be used elsewhere.
    """

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

    def test_concentration_requirement_relationship(self):
        self.assertCountEqual(
            list(self.cs_general.requirements.all()),
            [
                self.csg_gen_ed_req,
                self.csg_core_course_req,
                self.csg_concentration_req,
                self.csg_concentration_sup_req
            ]
        )
        self.assertEqual(
            self.csg_gen_ed_req.concentration,
            self.cs_general
        )

    def test_requirement_requirement_relationship(self):
        self.assertCountEqual(
            list(self.csg_concentration_sup_sub_req.sub_requirements.all()),
            [
                self.csg_concentration_sup_sub_1_req,
                self.csg_concentration_sup_sub_2_req,
                self.csg_concentration_sup_sub_3_req,
                self.csg_concentration_sup_sub_4_req,
            ]
        )
        self.assertEqual(
            self.csg_concentration_sub_req.super_requirement,
            self.csg_concentration_req
        )

    def test_requirement_course_relationships(self):
        self.assertCountEqual(
            list(self.csg_concentration_sup_req.courses.all()),
            [
                self.eet_252,
                self.mat_234,
                self.mat_239,
                self.mat_244,
                self.sta_270
            ]
        )
        self.assertCountEqual(
            list(self.csc_440.requirements.all()),
            [self.csg_concentration_req]
        )

    def test_college_semester_relationships(self):
        self.assertCountEqual(
            list(self.eku.semesters.all()),
            [
                self.spring_2019,
                self.fall_2019
            ]
        )
        self.assertCountEqual(
            list(self.fall_2019.colleges.all()),
            [
                self.eku,
                self.uk
            ]
        )

    def test_semester_user_relationships(self):
        self.assertCountEqual(
            list(self.fall_2019.students.all()),
            [
                self.student_william,
                self.student_john,
                self.student_jane
            ]
        )
        self.assertCountEqual(
            list(self.student_william.semesters.all()),
            [
                self.spring_2019,
                self.fall_2019
            ]
        )

    def test_course_instance_user_relationships(self):
        self.assertCountEqual(
            list(self.csc_440_instance.students.all()),
            [
                self.student_william,
                self.student_john
            ]
        )
        self.assertCountEqual(
            list(self.student_john.course_instances.all()),
            [self.csc_440_instance]
        )

    def test_course_instance_course_relationships(self):
        self.assertCountEqual(
            list(self.csc_440.course_instances.all()),
            [self.csc_440_instance]
        )
        self.assertEqual(
            self.csc_440_instance.course,
            self.csc_440
        )

    def test_course_instance_category_score_requirement_relationships(self):
        self.assertCountEqual(
            list(self.csc_440_instance.category_score_requirements.all()),
            [self.csc_440_category_score_requirement]
        )
        self.assertEqual(
            self.csc_440_category_score_requirement.course_instance,
            self.csc_440_instance
        )

    def test_category_score_requirement_category_relationships(self):
        self.assertCountEqual(
            list(self.csc_440_category_score_requirement.categories.all()),
            [
                self.csc_440_assignments,
                self.csc_440_exams,
                self.csc_440_individual_project,
                self.csc_440_team_project
            ]
        )
        self.assertCountEqual(
            list(self.csc_440_assignments.category_score_requirements.all()),
            [self.csc_440_category_score_requirement]
        )

    def test_course_instance_category_relationships(self):
        self.assertCountEqual(
            list(self.csc_440_instance.categories.all()),
            [
                self.csc_440_assignments,
                self.csc_440_exams,
                self.csc_440_individual_project,
                self.csc_440_team_project
            ]
        )
        self.assertEqual(
            self.csc_440_assignments.course_instance,
            self.csc_440_instance
        )

    def test_grade_entry_user_relationships(self):
        self.assertCountEqual(
            list(self.student_william.grade_entries.all()),
            [
                self.csc_440_assignment_1_william,
                self.csc_440_assignment_2_william,
                self.csc_440_assignment_3_william,
                self.csc_440_assignment_4_william,
                self.csc_440_assignment_5_william,
                self.csc_440_exam_1_william,
                self.csc_440_exam_2_william,
                self.csc_440_individual_project_william,
                self.csc_440_team_project_william
            ]
        )
        self.assertEqual(
            self.csc_440_assignment_1_william.student,
            self.student_william
        )

    def test_category_grade_entry_relationships(self):
        self.assertCountEqual(
            list(self.csc_440_exams.grade_entries.all()),
            [
                self.csc_440_exam_1_william,
                self.csc_440_exam_2_william
            ]
        )
        self.assertEqual(
            self.csc_440_exam_1_william.category,
            self.csc_440_exams
        )
