from grades.models import Course, CourseInstance, GradeEntry, Category
from rest_framework import viewsets, permissions
from grades.serializers import CourseSerializer, CourseInstanceSerializer, GradeEntrySerializer, CategorySerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CourseSerializer


class CourseInstanceViewSet(viewsets.ModelViewSet):
    queryset = CourseInstance.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CourseInstanceSerializer


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
        return [Category.objects.get(id=1)]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)
