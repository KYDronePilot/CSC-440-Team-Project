from rest_framework import routers

from grades.api import CourseViewSet, CourseInstanceViewSet, GradeEntryViewSet, CategoryViewSet, CollegeViewSet, \
    CategoryScoreRequirementViewSet, SemesterViewSet, CourseInstanceAddSearchViewSet, RequirementStructureViewSet, \
    MajorViewSet, ConcentrationViewSet

router = routers.DefaultRouter()
router.register('api/courses', CourseViewSet, 'courses')
router.register('api/course-instances', CourseInstanceViewSet, 'courses_instances')
router.register('api/course-instance-search', CourseInstanceAddSearchViewSet, 'course_instance_add_search')
router.register('api/grade-entries', GradeEntryViewSet, 'grade_entries')
router.register('api/categories', CategoryViewSet, 'categories')
router.register('api/colleges', CollegeViewSet, 'colleges')
router.register('api/category-score-requirements', CategoryScoreRequirementViewSet, 'category_score_requirements')
router.register('api/semesters', SemesterViewSet, 'semesters')
router.register('api/requirement-structure', RequirementStructureViewSet, 'requirement_structure')
router.register('api/majors', MajorViewSet, 'majors')
router.register('api/concentrations', ConcentrationViewSet, 'concentrations')

urlpatterns = router.urls
