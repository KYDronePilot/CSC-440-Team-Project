from grades.models import Course, CourseInstance, GradeEntry, Category, College, CategoryScoreRequirement, Semester
from rest_framework import viewsets, permissions
from django.db.models import Q, IntegerField
from typing import Optional
from django.db.models.functions import Cast
from grades.serializers import CourseSerializer, CourseInstanceSerializer, GradeEntrySerializer, CategorySerializer, \
    CollegeSerializer, CategoryScoreRequirementSerializer, SemesterSerializer


class CourseViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CourseSerializer

    def get_queryset(self):
        return Course.objects.filter(course_instances__students=self.request.user)


class CourseInstanceViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CourseInstanceSerializer

    def get_queryset(self):
        return self.request.user.course_instances.all()


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
    #
    # def perform_create(self, serializer):
    #     serializer.save(student=self.request.user)


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
        queryset = Semester.objects.all()
        if 'search' in self.request.query_params:
            query_string = self.request.query_params['search']
            queryset = queryset.annotate(year_str=Cast('year', IntegerField()))
            queryset = queryset.filter(Q(year_str__icontains=query_string) | Q(season__icontains=query_string))
            queryset = queryset.order_by('-last_updated')[:20]
        if 'student_id' in self.request.query_params:
            queryset = queryset.filter(students=self.request.query_params['student_id'])
        if 'exclude_student_id' in self.request.query_params:
            queryset = queryset.filter(~Q(students=self.request.query_params['exclude_student_id']))

        return queryset
