from django.db import models
class Student(models.Model):
    name = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)

class Task(models.Model):
    description = models.TextField()
    subject = models.CharField(max_length=50)
    link = models.CharField(max_length=150)
    createdDate = models.DateTimeField(auto_now_add=True)
    interval = models.IntegerField()
    student = models.ForeignKey(Student, on_delete=models.CASCADE)







# Create your models here.
