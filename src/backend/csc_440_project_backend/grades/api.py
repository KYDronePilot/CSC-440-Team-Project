from grades.models import Course, CourseInstance, GradeEntry, Category, College, CategoryScoreRequirement, Semester
from rest_framework import viewsets, permissions
from grades.serializers import CourseSerializer, CourseInstanceSerializer, GradeEntrySerializer, CategorySerializer, \
    CollegeSerializer, CategoryScoreRequirementSerializer, SemesterSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CourseSerializer


class CourseInstanceViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CourseInstanceSerializer

    def get_queryset(self):
        return CourseInstance.objects.all()


class GradeEntryViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = GradeEntrySerializer

    def get_queryset(self):
        queryset = self.request.user.grade_entries.all()
        if 'category_id' in self.request.query_params:
            queryset.filter(category_id=self.request.query_params['category_id'])

        return queryset

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(course_instance__students=self.request.user)

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)


class CollegeViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CollegeSerializer

    def get_queryset(self):
        return self.request.user.colleges.all()


class CategoryScoreRequirementViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CategoryScoreRequirementSerializer

    def get_queryset(self):
        return CategoryScoreRequirement.objects.filter(course_instance__students=self.request.user)


class SemesterViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = SemesterSerializer

    def get_queryset(self):
        queryset = self.request.user.semesters.all()
        if 'user_id' in self.request.query_params:
            queryset.filter(category_id=self.request.query_params['category_id'])

        return queryset
