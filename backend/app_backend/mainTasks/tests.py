import json

from django.test import TestCase
import django.utils.timezone as tz
from mainTasks.models import Student, Task
from django.test import Client
from datetime import timedelta, datetime
class TaskTestCase(TestCase):
    def setUp(self):
        s = Student.objects.create(username="abc",password="qwerty")
        self.date = tz.now()
        Task.objects.create(student=s,
                            interval=5,
                            description="Test task 1",
                            subject="Nope")
        self.client = Client()
    def test_login(self):

        s = Student.objects.all().first()
        resp = self.client.get("/login/",{"username": s.username, "password": s.password})
        ret_result = json.loads(resp.content)
        self.assertEqual(ret_result['id'], s.id)
    def test_get_tasks(self):
        t = Task.objects.all().first()
        resp = self.client.get("/tasks/", data = {
            "id": t.student.id,
            "date": datetime.strftime(t.createdDate + timedelta(t.interval), "%Y-%m-%d")
        }
        )
        ret_result = json.loads(resp.content)
        assert len(ret_result)==1
# Create your tests here.
