from django.test import TestCase
from grades.models import Requirement


class TestRequirements(TestCase):
    """
    Test the requirements model.
    """

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
