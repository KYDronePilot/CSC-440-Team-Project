from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField

from grades.models import Course, CourseInstance, GradeEntry, Category, College, CategoryScoreRequirement, Semester, \
    Requirement, Major, Concentration


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class CourseInstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseInstance
        fields = '__all__'


class CourseInstanceSearchCourseSerializer(CourseSerializer):
    """
    Serialize courses for use when searching course instances.
    """

    class Meta:
        model = Course
        fields = ('id', 'code', 'name')


class CourseInstanceSearchSerializer(CourseInstanceSerializer):
    """
    Serialize common information needed when searching for a course instance.
    """

    course = CourseInstanceSearchCourseSerializer()

    class Meta:
        model = CourseInstance
        fields = ('id', 'section', 'course')


class GradeEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = GradeEntry
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = '__all__'


class CategoryScoreRequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryScoreRequirement
        fields = (
            'id',
            'last_updated',
            'notes',
            'min_a',
            'min_b',
            'min_c',
            'min_d',
            'course_instance',
            'categories'
        )


class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ('colleges', 'id', 'last_updated', 'notes', 'season', 'year', 'students')


class RequirementStructureCoursesSerializer(serializers.ModelSerializer):
    """
    Serializer for courses in requirements structure.
    """
    fulfilled = serializers.BooleanField()

    class Meta:
        model = Course
        fields = ('name', 'code', 'credit_hours')


class RequirementStructureSerializer(serializers.ModelSerializer):
    fulfilled = serializers.BooleanField()
    courses = serializers.ListField(RequirementStructureCoursesSerializer)
    sub_requirements = RecursiveField(many=True)

    class Meta:
        model = Requirement
        fields = ('name', 'courses', 'sub_requirements', 'fulfilled')


class MajorSerializer(serializers.ModelSerializer):
    """
    Simple Major serializer.
    """

    class Meta:
        model = Major
        fields = '__all__'


class ConcentrationSerializer(serializers.ModelSerializer):
    """
    Simple Concentration serializer.
    """

    class Meta:
        model = Concentration
        fields = '__all__'
