from rest_framework import routers
from grades.api import CourseViewSet, CourseInstanceViewSet

router = routers.DefaultRouter()
router.register('api/courses', CourseViewSet, 'courses')
router.register('api/courses-instances', CourseInstanceViewSet, 'courses_instances')

urlpatterns = router.urls
