from django.urls import path

from . import views
from django.views.decorators.csrf import csrf_exempt
urlpatterns = [

    path('login/',views.login),
    path('register/',views.register),
    path('tasks/', views.getTasks),
    path('add_task/', views.addTask)
]
