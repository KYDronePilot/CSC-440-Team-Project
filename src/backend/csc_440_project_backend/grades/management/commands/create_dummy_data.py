from django.core.management.base import BaseCommand

from grades.tests.test_model_relationships import TestModelRelationships


class Command(BaseCommand):
    help = 'Create dummy data in database'

    def handle(self, *args, **kwargs):
        test = TestModelRelationships()
        test.setUp()
        self.stdout.write('Dummy data has been created')
