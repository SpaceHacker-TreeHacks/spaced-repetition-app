from django.db import models
class Student(models.Model):
    name = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    checkbook_key=models.CharField(max_length=50, blank=True, null=True)
    checkbook_secret_key = models.CharField(max_length=50, blank=True, null=True)

class Task(models.Model):
    description = models.TextField()
    subject = models.CharField(max_length=50, blank=True)
    link = models.CharField(max_length=150, blank=True)
    type = models.CharField(max_length=150)
    payeeEmail = models.CharField(max_length=150, null=True)
    payeeName = models.CharField(max_length=150, null=True)
    amount = models.FloatField(null=True)
    createdDate = models.DateTimeField(auto_now_add=True)
    interval = models.IntegerField()
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    last_paid = models.DateField(null=True,blank=True)






# Create your models here.
