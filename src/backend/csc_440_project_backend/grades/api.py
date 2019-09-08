from grades.models import Course, CourseInstance
from rest_framework import viewsets, permissions
from grades.serializers import CourseSerializer, CourseInstanceSerializer


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
