from django.contrib import admin
from grades.models import Category, CategoryScoreRequirement, College, Concentration, ConcentrationCourse, Course, \
    CourseInstance, GradeEntry, Major, Semester, User

admin.site.register(Category)
admin.site.register(CategoryScoreRequirement)
admin.site.register(College)
admin.site.register(Concentration)
admin.site.register(ConcentrationCourse)
admin.site.register(Course)
admin.site.register(CourseInstance)
admin.site.register(GradeEntry)
admin.site.register(Major)
admin.site.register(Semester)
admin.site.register(User)
