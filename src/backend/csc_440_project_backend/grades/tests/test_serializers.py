from grades.models.requirement import get_requirements_structure
from grades.serializers import RequirementStructureSerializer
from grades.tests.test_model_relationships import TestDatabaseSetup


class TestSerializers(TestDatabaseSetup):
    """
    Test serializers.
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

    def test_requirements_structure_serializer(self):
        self.csc_494_instance.students.add(self.student_william)
        struct = get_requirements_structure(self.csg_concentration_sub_req, self.student_william)
        serialized = RequirementStructureSerializer(struct)
        self.assertEqual(
            serialized.data,
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
