from grades.models import Course, CourseInstance, GradeEntry
from rest_framework import viewsets, permissions
from grades.serializers import CourseSerializer, CourseInstanceSerializer, GradeEntrySerializer


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
        return self.request.user.grade_entries.all()

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)
