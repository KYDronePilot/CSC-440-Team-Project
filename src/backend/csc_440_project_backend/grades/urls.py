from rest_framework import routers
from grades.api import CourseViewSet, CourseInstanceViewSet, GradeEntryViewSet, CategoryViewSet

router = routers.DefaultRouter()
router.register('api/courses', CourseViewSet, 'courses')
router.register('api/courses-instances', CourseInstanceViewSet, 'courses_instances')
router.register('api/grade-entries', GradeEntryViewSet, 'grade_entries')
router.register('api/categories', CategoryViewSet, 'categories')

urlpatterns = router.urls
