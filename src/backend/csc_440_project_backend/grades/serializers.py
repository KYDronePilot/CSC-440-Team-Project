from rest_framework import serializers
from grades.models import Course, CourseInstance, GradeEntry


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class CourseInstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseInstance
        fields = '__all__'


class GradeEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = GradeEntry
        fields = '__all__'
