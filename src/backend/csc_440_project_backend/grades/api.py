from grades.models import Course, CourseInstance, GradeEntry, Category, College, CategoryScoreRequirement, Semester, \
    User
from rest_framework import viewsets, permissions
from django.db.models import Q, IntegerField, CharField
from typing import Optional
from rest_framework.response import Response
from rest_framework import filters
from rest_framework.mixins import status
from django.db.models.functions import Cast
from grades.serializers import CourseSerializer, CourseInstanceSerializer, GradeEntrySerializer, CategorySerializer, \
    CollegeSerializer, CategoryScoreRequirementSerializer, SemesterSerializer, CourseInstanceAddSearchSerializer


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
        # CourseInstance.objects.filter(course__name=)
        # CourseInstance.objects.filter(course__code=)
        # CourseInstance.objects.filter(college)
        return self.request.user.course_instances.all()


class CourseInstanceAddSearchViewSet(CourseInstanceViewSet):
    """
    For searching for a particular semester.
    """
    filter_backends = (filters.SearchFilter,)
    search_fields = ('id', 'section_str', 'course__name', 'course__code')
    serializer_class = CourseInstanceAddSearchSerializer

    def get_queryset(self):
        queryset = CourseInstance.objects.all()
        return queryset.annotate(section_str=Cast('section', CharField()))


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
        if 'student_id' in self.request.query_params:
            queryset = queryset.filter(students=self.request.user.id)
        elif 'exclude_student_id' in self.request.query_params:
            queryset = queryset.filter(~Q(students=self.request.user.id))
        if 'search' in self.request.query_params:
            query_string = self.request.query_params['search']
            queryset = queryset.annotate(year_str=Cast('year', IntegerField()))
            queryset = queryset.filter(Q(year_str__icontains=query_string) | Q(season__icontains=query_string))
            queryset = queryset.order_by('-last_updated')[:20]

        return queryset

    def destroy_student_relationship(self) -> Response:
        """
        Destroy relationship between student and semester, including all
        course instances and grade entries.

        Returns:
            Success response
        """
        semester = self.get_object()
        student = self.request.user

        # Delete grade entries
        GradeEntry.objects.filter(Q(student=student) & Q(category__course_instance__semester=semester)).delete()

        # Delete course instance relationships
        course_instances = CourseInstance.objects.filter(Q(semester=semester) & Q(students=student))
        student.course_instances.remove(*course_instances)

        # Delete semester relationship
        student.semesters.remove(semester)

        return Response(status=status.HTTP_204_NO_CONTENT)

    def destroy(self, request, *args, **kwargs):
        if 'student_relationship' in self.request.query_params:
            return self.destroy_student_relationship()

        # No one can delete a semester via the API
        return status.HTTP_403_FORBIDDEN
