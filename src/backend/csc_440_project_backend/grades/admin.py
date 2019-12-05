from django.contrib import admin

from grades.models import Category, College, Concentration, Course, CourseInstance, \
    Major, Semester, User, Requirement


@admin.register(Category, College, Concentration, Course, CourseInstance, Major, Semester, User, Requirement)
class MainAdmin(admin.ModelAdmin):
    """
    Config for admin interface.
        Removes fields not currently used.
    """
    exclude = (
        'notes',
        'max_points',
        'category_score_requirements',
        'grading_strategy',
        'is_gen_ed',
        'is_deprecated',
        'is_required'
    )
