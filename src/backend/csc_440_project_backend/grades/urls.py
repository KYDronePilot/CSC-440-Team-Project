from rest_framework import routers
from grades.api import CourseViewSet, CourseInstanceViewSet, GradeEntryViewSet

router = routers.DefaultRouter()
router.register('api/courses', CourseViewSet, 'courses')
router.register('api/courses-instances', CourseInstanceViewSet, 'courses_instances')
router.register('api/grade-entries', GradeEntryViewSet, 'grade_entries')

urlpatterns = router.urls
