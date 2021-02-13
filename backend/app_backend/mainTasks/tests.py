from django.test import TestCase
import django.utils.timezone as tz
from mainTasks.models import Student, Task


class TaskTestCase(TestCase):
    def setUp(self):
        Student.objects.create(username="abc",password="qwerty")
        self.date = tz.now()
        Task.objects.create(student=task,
                            interval=5,
                            description="Test task 1")
        Task
# Create your tests here.
