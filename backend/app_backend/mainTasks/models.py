from django.db import models

class Task(models.Model):
    description = models.TextField()
    subject = models.CharField()
    link = models.CharField()
    createdDate = models.CharField()
    interval = models.IntegerField()

class Student(models.model):
    name = models.CharField()
    


# Create your models here.
