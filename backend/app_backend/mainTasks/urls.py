from django.urls import path

from . import views

urlpatterns = [

    path('login/',views.login),
    path('register/',views.register),
    path('tasks/', views.getTasks),
    path('add_task/', views.addTask)
]
