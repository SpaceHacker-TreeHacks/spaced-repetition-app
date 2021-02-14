from django.db import models
from django.http import JsonResponse
from django.shortcuts import render
from datetime import datetime
from django.core import serializers
from mainTasks.models import Student, Task
from django.views.decorators.csrf import csrf_exempt
import json
from django.forms.models import model_to_dict
from hashlib import sha256
import requests
@csrf_exempt
def register(request):
    data = json.loads(request.body)
    username = data['email']
    passwd = data['password']
    checkbook_key = data.get('key', "")
    checkbook_

    current = Student.objects.filter(username=username)
    if current.exists():
        return JsonResponse({"error": "username taken"})
    student = Student.objects.create(username=username, password=passwd)
    return JsonResponse({"id": student.id})
@csrf_exempt
def login(request):
    username = request.GET.get('username', None)
    if username is None:
        username = request.GET.get('email')
    passwd = request.GET['password']
    student = Student.objects.filter(username=username)
    if student.exists():
        student=student.first()
        if passwd == student.password:
            return JsonResponse({"id": student.id})
        else:
            return JsonResponse({"error": "bad auth"})
    else:
        return JsonResponse({"error": "bad auth"})


@csrf_exempt
def addTask(request):

    data = json.loads(request.body)
    id = data['id']
    description = data['description']
    subject = data['subject']
    link = data.get('link', None)
    interval_days = int(data.get("interval"))

    student = Student.objects.get(id=id)
    task = Task.objects.create(
        description=description,
        subject=subject,
        link=link,
        interval = interval_days,
        student=student
    )
    return JsonResponse({"status": "success", "taskId": task.id})
@csrf_exempt
def getTasks(request):
    data = request.GET
    id = data['id']
    string_date = data['date']
    date = datetime.strptime(string_date, "%Y-%m-%d")
    student = Student.objects.get(id=id)
    tasks = student.task_set.all()
    result = []
    for task in tasks:
        naive_date = task.createdDate.replace(tzinfo=None).date()
        difference = date.date() - naive_date
        print(difference)
        if difference.days!=0 and difference.days % task.interval == 0:
            result.append(model_to_dict(task,fields=('id', 'description', 'subject', 'link', 'interval')))
    return JsonResponse(result, safe=False)
@csrf_exempt
def makePayment(request):
    data = json.loads(request.body)
    bill_id=int(data['id'])
    b = Task.objects.get(id=bill_id)
    assert b.type == "bill"
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': 'f7e5b4af356a95c821c17d62a106ab2a:5172c0160319c3a1538ddc071658fa80'
    }
    data = {
        "recipient": b.payeeEmail,
        "name": b.payeeName,
        "amount": b.amount,
        "description": b.description
    }
    resp = requests.post("https://api.sandbox.checkbook.io/v3/check/digital", json=data, headers=headers)
    print(resp.content)


# Create your views here.
