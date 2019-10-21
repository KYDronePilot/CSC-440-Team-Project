from django.db.models import Q, IntegerField
from django.db.models.functions import Cast
from rest_framework import viewsets, permissions, filters
from rest_framework.mixins import status
from rest_framework.response import Response

from grades.models import Course, CourseInstance, GradeEntry, Category, CategoryScoreRequirement, Semester, \
    Requirement, College, Major, Concentration
from grades.serializers import CourseSerializer, CourseInstanceSerializer, GradeEntrySerializer, CategorySerializer, \
    CollegeSerializer, CategoryScoreRequirementSerializer, SemesterSerializer, CourseInstanceSearchSerializer, \
    RequirementStructureSerializer, MajorSerializer, ConcentrationSerializer


class GenericViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]


class CourseViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CourseSerializer

    def get_queryset(self):
        if 'pk' in self.kwargs:
            return Course.objects.filter(id=self.kwargs['pk'])
        return Course.objects.filter(course_instances__students=self.request.user)


class CourseInstanceViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CourseInstanceSerializer

    def destroy_student_relationship(self) -> Response:
        """
        Destroy relationship between student and course instance, including
        all grade entries.

        Returns:
            Success response
        """
        course_instance = self.get_object()
        student = self.request.user

        # Delete grade entries
        GradeEntry.objects.filter(Q(student=student) & Q(category__course_instance=course_instance)).delete()

        # Delete student relationship
        student.course_instances.remove(course_instance)

        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        if 'pk' in self.kwargs:
            return CourseInstance.objects.filter(id=self.kwargs['pk'])
        return self.request.user.course_instances.all()

    def destroy(self, request, *args, **kwargs):
        if 'student_relationship' in self.request.query_params:
            return self.destroy_student_relationship()

        # No one can delete a semester via the API
        return status.HTTP_403_FORBIDDEN


class CourseInstanceAddSearchViewSet(CourseInstanceViewSet):
    """
    For searching for a particular semester.
    """
    filter_backends = (filters.SearchFilter,)
    search_fields = ('id', 'section', 'course__name', 'course__code', 'course__id')
    serializer_class = CourseInstanceSearchSerializer

    def get_queryset(self):
        queryset = CourseInstance.objects.select_related('course').all()
        if 'exclude_self' in self.request.query_params:
            queryset = queryset.filter(~Q(students=self.request.user))
        if 'semester_id' in self.request.query_params:
            queryset = queryset.filter(Q(semester_id=int(self.request.query_params['semester_id'])))
        return queryset


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
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'location')
    serializer_class = CollegeSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return College.objects.all()


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


class RequirementStructureViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = RequirementStructureSerializer

    def retrieve(self, request, *args, **kwargs):
        # TODO: Be consistent with between 'model_name' and 'model_name_id' query params
        # TODO: Fix this. Shouldn't be using pk for this situation
        if 'pk' not in self.kwargs:
            return Response(status=status.HTTP_404_NOT_FOUND)
        # if 'concentration' not in self.request.query_params:
        #     return Response(status=status.HTTP_404_NOT_FOUND)
        queryset = Requirement.objects.get(concentration_id=self.kwargs['pk'])
        # queryset = Requirement.objects.get(concentration_id=self.request.query_params['concentration'])
        data = queryset.get_requirements_structure(self.request.user)
        serializer = RequirementStructureSerializer(data)
        return Response(serializer.data)


class MajorViewSet(GenericViewSet):
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)
    serializer_class = MajorSerializer

    def get_queryset(self):
        queryset = Major.objects
        if 'college_id' in self.request.query_params:
            queryset = queryset.filter(college_id=self.request.query_params['college_id'])
        return queryset.all()


class ConcentrationViewSet(GenericViewSet):
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)
    serializer_class = ConcentrationSerializer

    def get_queryset(self):
        queryset = Concentration.objects
        if 'major_id' in self.request.query_params:
            queryset = queryset.filter(major_id=self.request.query_params['major_id'])
        return queryset.all()
