from unittest.mock import patch

from ddt import ddt, data, unpack

from grades.models import Requirement
from grades.tests.test_model_relationships import TestDatabaseSetup


@ddt
class TestRequirements(TestDatabaseSetup):
    """
    Test the requirements model.
    """

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
        # self.create_course_instance_user_relationships()

    def test_is_sub_requirement(self):
        super_requirement = Requirement.objects.create(
            name='Main requirement',
            is_required=True
        )
        sub_requirement = Requirement.objects.create(
            name='Sub requirement',
            is_required=True,
            super_requirement=super_requirement
        )

        self.assertFalse(super_requirement.is_sub_requirement())
        self.assertTrue(sub_requirement.is_sub_requirement())

    def test_course_instances(self):
        course_instances = self.csg_concentration_req.course_instances.all()
        self.assertCountEqual(
            course_instances,
            [
                self.csc_311_instance,
                self.csc_320_instance,
                self.csc_360_instance,
                self.csc_400_instance,
                self.csc_440_instance,
                self.csc_460_instance,
                self.csc_541_instance,
                self.csc_545_instance
            ]
        )

    def test_get_completed_courses(self):
        self.csc_310_instance.students.add(self.student_william)
        self.csc_311_instance.students.add(self.student_william)
        self.csc_494_instance.students.add(self.student_william)

        completed_courses = self.csg_concentration_req.get_completed_courses(self.student_william).all()
        self.assertCountEqual(
            completed_courses,
            [self.csc_311]
        )

    def test_get_completed_sub_requirement_courses(self):
        self.csc_310_instance.students.add(self.student_william)
        self.csc_311_instance.students.add(self.student_william)
        self.csc_494_instance.students.add(self.student_william)

        completed_courses = self.csg_concentration_req.get_completed_sub_requirement_courses(self.student_william).all()
        self.assertCountEqual(
            completed_courses,
            [self.csc_494]
        )

    def test_are_course_requirements_fulfilled(self):
        # Requirement with no course count requirements
        null_course_count_req = Requirement.objects.create(
            name='Test Name',
            is_required=True
        )
        self.assertTrue(null_course_count_req.are_course_requirements_fulfilled(self.student_william))

        # Test requirement which needs 1 hour (1 course for current implementation)
        # TODO: This should be based on credit hours, not course count
        # No courses, not fulfilled
        self.assertFalse(self.csg_concentration_sub_req.are_course_requirements_fulfilled(self.student_william))
        # Add one course, now fulfilled
        self.csc_494_instance.students.add(self.student_william)
        self.assertTrue(self.csg_concentration_sub_req.are_course_requirements_fulfilled(self.student_william))
        # Add another course, still fulfilled
        self.csc_496_instance.students.add(self.student_william)
        self.assertTrue(self.csg_concentration_sub_req.are_course_requirements_fulfilled(self.student_william))

        # Test larger requirement
        # Need 8 to fulfill
        self.csc_311_instance.students.add(self.student_william)
        self.assertFalse(self.csg_concentration_req.are_course_requirements_fulfilled(self.student_william))
        # Add the rest
        self.csc_320_instance.students.add(self.student_william)
        self.csc_360_instance.students.add(self.student_william)
        self.csc_400_instance.students.add(self.student_william)
        self.csc_440_instance.students.add(self.student_william)
        self.csc_460_instance.students.add(self.student_william)
        self.csc_541_instance.students.add(self.student_william)
        self.csc_545_instance.students.add(self.student_william)

    def test_are_sub_requirements_fulfilled(self):
        # Requirement with no sub-requirement count
        self.assertTrue(self.csg_concentration_sub_req.are_sub_requirements_fulfilled(self.student_william))

        # Before adding course instances
        self.assertFalse(self.csg_concentration_sup_sub_req.are_sub_requirements_fulfilled(self.student_william))

        # Fulfill sub-requirement
        self.bio_111_instance.students.add(self.student_william)
        self.bio_112_instance.students.add(self.student_william)
        self.assertTrue(self.csg_concentration_sup_sub_req.are_sub_requirements_fulfilled(self.student_william))

    def test_is_sub_requirement_course_count_fulfilled(self):
        # Requirement with no sub-requirement course count
        self.assertTrue(self.csg_concentration_sub_req.is_sub_requirement_course_count_fulfilled(self.student_william))

        # Before adding course instances
        self.assertFalse(
            self.csg_concentration_sup_sub_req.is_sub_requirement_course_count_fulfilled(self.student_william)
        )

        # Fulfill sub-requirement course count
        self.gly_108_instance.students.add(self.student_william)
        self.phy_201_instance.students.add(self.student_william)
        self.assertTrue(
            self.csg_concentration_sup_sub_3_req.is_sub_requirement_course_count_fulfilled(self.student_william)
        )

    @data(
        (False, False, False, False),
        (True, False, False, False),
        (True, True, True, True)
    )
    @unpack
    @patch('grades.models.requirement.Requirement.are_course_requirements_fulfilled')
    @patch('grades.models.requirement.Requirement.are_sub_requirements_fulfilled')
    @patch('grades.models.requirement.Requirement.is_sub_requirement_course_count_fulfilled')
    def test_is_fulfilled(
            self,
            are_course_requirements_return,
            are_sub_requirements_return,
            is_sub_requirement_return,
            result,
            is_sub_requirement_course_count_fulfilled_mock,
            are_sub_requirements_fulfilled_mock,
            are_course_requirements_fulfilled_mock
    ):
        is_sub_requirement_course_count_fulfilled_mock.return_value = is_sub_requirement_return
        are_sub_requirements_fulfilled_mock.return_value = are_sub_requirements_return
        are_course_requirements_fulfilled_mock.return_value = are_course_requirements_return

        self.assertEqual(
            self.csg_concentration_req.is_fulfilled(self.student_william),
            result
        )
        print('test')

    def test_get_requirements_structure_not_nested(self):
        # Simpler case when requirement is at first level (no sub-requirements)
        self.csc_494_instance.students.add(self.student_william)
        struct = self.csg_concentration_sub_req.get_requirements_structure(self.student_william)
        self.assertEqual(
            struct,
            {
                'courses': [
                    {
                        'code': 'CSC 494',
                        'credit_hours': 1.0,
                        'fulfilled': True,
                        'name': 'Innovative Problem Solving'
                    },
                    {
                        'code': 'CSC 495',
                        'credit_hours': 1.0,
                        'fulfilled': False,
                        'name': 'Independent Work'
                    },
                    {
                        'code': 'CSC 496',
                        'credit_hours': 1.0,
                        'fulfilled': False,
                        'name': 'Senior Seminar'
                    }
                ],
                'fulfilled': True,
                'name': 'Plus One (1) Hour Selected from',
                'sub_requirements': []
            }
        )

    def test_get_requirements_structure_nested(self):
        # More complicated case when requirements are nested
        self.csc_311_instance.students.add(self.student_william)
        self.csc_494_instance.students.add(self.student_william)
        struct = self.csg_concentration_req.get_requirements_structure(self.student_william)
        self.assertEqual(
            struct,
            {
                'courses': [
                    {
                        'code': 'CSC 311',
                        'credit_hours': 3.0,
                        'fulfilled': True,
                        'name': 'Algorithms I'
                    },
                    {
                        'code': 'CSC 320',
                        'credit_hours': 3.0,
                        'fulfilled': False,
                        'name': 'Introduction to Algorithms'
                    },
                    {
                        'code': 'CSC 360',
                        'credit_hours': 3.0,
                        'fulfilled': False,
                        'name': 'Computer Org and Architecture'
                    },
                    {
                        'code': 'CSC 400',
                        'credit_hours': 3.0,
                        'fulfilled': False,
                        'name': 'Operating Systems'
                    },
                    {
                        'code': 'CSC 440',
                        'credit_hours': 3.0,
                        'fulfilled': False,
                        'name': 'Applied Software Engineering'
                    },
                    {
                        'code': 'CSC 460',
                        'credit_hours': 3.0,
                        'fulfilled': False,
                        'name': 'Computer Network & System Administration'
                    },
                    {
                        'code': 'CSC 541',
                        'credit_hours': 3.0,
                        'fulfilled': False,
                        'name': 'Software Testing'
                    },
                    {
                        'code': 'CSC 545',
                        'credit_hours': 3.0,
                        'fulfilled': False,
                        'name': 'Theory of Database Systems'
                    }
                ],
                'fulfilled': False,
                'name': 'Computer Science (General) Concentration Requirements',
                'sub_requirements': [
                    {
                        'courses': [
                            {
                                'code': 'CSC 494',
                                'credit_hours': 1.0,
                                'fulfilled': True,
                                'name': 'Innovative Problem Solving'
                            },
                            {
                                'code': 'CSC 495',
                                'credit_hours': 1.0,
                                'fulfilled': False,
                                'name': 'Independent Work'
                            },
                            {
                                'code': 'CSC 496',
                                'credit_hours': 1.0,
                                'fulfilled': False,
                                'name': 'Senior Seminar'
                            }
                        ],
                        'fulfilled': True,
                        'name': 'Plus One (1) Hour Selected from',
                        'sub_requirements': []
                    }
                ]
            }
        )

    def test_get_requirements_structure_deeply_nested(self):
        # Very complicated requirements structure
        self.eet_252_instance.students.add(self.student_william)
        self.bio_111_instance.students.add(self.student_william)
        self.bio_112_instance.students.add(self.student_william)
        struct = self.csg_concentration_sup_req.get_requirements_structure(self.student_william)
        self.assertEqual(
            struct,
            {
                'courses': [
                    {
                        'code': 'EET 252',
                        'credit_hours': 3.0,
                        'fulfilled': True,
                        'name': 'Digital Electronics'
                    },
                    {
                        'code': 'MAT 234',
                        'credit_hours': 4.0,
                        'fulfilled': False,
                        'name': 'Calculus I'
                    },
                    {
                        'code': 'MAT 239',
                        'credit_hours': 3.0,
                        'fulfilled': False,
                        'name': 'Linear Algebra & Matrices'
                    },
                    {
                        'code': 'MAT 244',
                        'credit_hours': 4.0,
                        'fulfilled': False,
                        'name': 'Calculus II'
                    },
                    {
                        'code': 'STA 270',
                        'credit_hours': 4.0,
                        'fulfilled': False,
                        'name': 'Applied Statistics I'
                    }
                ],
                'fulfilled': False,
                'name': 'Computer Science (General) Concentration Supporting Course Requirements',
                'sub_requirements': [
                    {
                        'courses': [],
                        'fulfilled': False,
                        'name': 'Plus One (1) Of The Following Bracketed Physical Science Sequences',
                        'sub_requirements': [
                            {
                                'courses': [
                                    {
                                        'code': 'BIO 111',
                                        'credit_hours': 4.0,
                                        'fulfilled': True,
                                        'name': 'Cell and Molecular Biology'
                                    },
                                    {
                                        'code': 'BIO 112',
                                        'credit_hours': 4.0,
                                        'fulfilled': True,
                                        'name': 'Ecology and Evolution'
                                    }
                                ],
                                'fulfilled': True,
                                'name': 'Biology Sequence',
                                'sub_requirements': []
                            },
                            {
                                'courses': [
                                    {
                                        'code': 'CHE 111',
                                        'credit_hours': 3.0,
                                        'fulfilled': False,
                                        'name': 'General Chemistry I'
                                    },
                                    {
                                        'code': 'CHE 111L',
                                        'credit_hours': 1.0,
                                        'fulfilled': False,
                                        'name': 'General Chemistry Lab I'
                                    },
                                    {
                                        'code': 'CHE 112',
                                        'credit_hours': 3.0,
                                        'fulfilled': False,
                                        'name': 'General Chemistry II'
                                    },
                                    {
                                        'code': 'CHE 112L',
                                        'credit_hours': 1.0,
                                        'fulfilled': False,
                                        'name': 'General Chemistry Lab II'
                                    }
                                ],
                                'fulfilled': False,
                                'name': 'Chemistry Sequence',
                                'sub_requirements': []
                            },
                            {
                                'courses': [
                                    {
                                        'code': 'GLY 108',
                                        'credit_hours': 3.0,
                                        'fulfilled': False,
                                        'name': 'Plate Tectonics: The Active Earth'
                                    },
                                    {
                                        'code': 'GLY 109',
                                        'credit_hours': 3.0,
                                        'fulfilled': False,
                                        'name': 'Great Moments in Earth History'
                                    }
                                ],
                                'fulfilled': False,
                                'name': 'Geology Sequence',
                                'sub_requirements': []
                            },
                            {
                                'courses': [
                                    {
                                        'code': 'PHY 201',
                                        'credit_hours': 5.0,
                                        'fulfilled': False,
                                        'name': 'University Physics I'
                                    },
                                    {
                                        'code': 'PHY 202',
                                        'credit_hours': 5.0,
                                        'fulfilled': False,
                                        'name': 'University Physics II'
                                    }
                                ],
                                'fulfilled': False,
                                'name': 'Physics Sequence',
                                'sub_requirements': []
                            }
                        ]
                    }
                ]
            }
        )
