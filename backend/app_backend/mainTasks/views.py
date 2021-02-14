import datetime

from django.db import models
from django.http import JsonResponse
from django.shortcuts import render
from django.core import serializers
from mainTasks.models import Student, Task
from django.views.decorators.csrf import csrf_exempt
import json
from django.forms.models import model_to_dict
from hashlib import sha256
from django.utils import timezone as tz
import requests
@csrf_exempt
def register(request):
    data = json.loads(request.body)
    username = data['email']
    passwd = data['password']
    checkbook_key = data.get('key', None)
    checkbook_secret_key = data.get('secretKey', None)

    current = Student.objects.filter(username=username)
    if current.exists():
        return JsonResponse({"error": "username taken"})
    student = Student.objects.create(username=username, password=passwd,
                                     checkbook_key=checkbook_key, checkbook_secret_key=checkbook_secret_key)
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
    if request.content_type == 'application/json':
        data = json.loads(request.body)
    else:
        data = request.POST
    id = data['id']
    type = data.get('type', None)
    if type is None:
        b = bool(data.get('isTask'))
        if b:
            type = "task"
        else:
            type = "bill"


    description = data['description']

    interval_days = int(data.get("interval"))
    payeeName,payeeEmail,subject,link = "", "", "", ""
    amount=-1
    if type=="bill":
        payeeName = data['payeeName']
        payeeEmail = data['payeeEmail']
        amount = int(data['amount'])
    else:
        subject = data['subject']
        link = data.get('link', None)


    student = Student.objects.get(id=id)
    task = Task.objects.create(
        type=type,
        description=description,
        subject=subject,
        link=link,
        interval = interval_days,
        student=student,
        payeeName=payeeName,
        payeeEmail=payeeEmail,
        amount=amount
    )
    return JsonResponse({"status": "success", "taskId": task.id})
@csrf_exempt
def getTasks(request):
    data = request.GET
    id = data['id']
    string_date = data['date']
    date = datetime.datetime.strptime(string_date, "%Y-%m-%d")
    student = Student.objects.get(id=id)
    tasks = student.task_set.all()
    result = []
    for task in tasks:
        if task.type == 'bill':
            if task.last_paid == tz.now().replace(tzinfo=None).date():
                continue
        naive_date = task.createdDate.replace(tzinfo=None).date()
        difference = date.date() - naive_date
        print(difference)
        if difference.days!=0 and difference.days % task.interval == 0:
            result.append(model_to_dict(task,fields=('type', 'id', 'description', 'subject', 'link', 'interval', 'payeeName', 'payeeEmail','amount')))
    return JsonResponse(result, safe=False)
@csrf_exempt
def makePayment(request):
    data = json.loads(request.body)
    bill_id=int(data['id'])
    b = Task.objects.get(id=bill_id)
    assert b.type == "bill"
    s = b.student
    if len(s.checkbook_secret_key)==0:
        return JsonResponse({"error": "secretKey and key are required to pay bills"})
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': '{}:{}'.format(s.checkbook_key,s.checkbook_secret_key)
    }
    data = {
        "recipient": b.payeeEmail,
        "name": b.payeeName,
        "amount": b.amount,
        "description": b.description
    }
    resp = requests.post("https://api.sandbox.checkbook.io/v3/check/digital", json=data, headers=headers)
    print(resp.content)
    b.last_paid = tz.now().date()


# Create your views here.
