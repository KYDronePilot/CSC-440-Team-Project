from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('vGSZCmHdZHEMkdsyvwIWPIqBuRWxOxFJriNkFIqggAePWpYcDQ/', admin.site.urls),
    path('', include('grades.urls')),
    path('', include('accounts.urls'))
]
