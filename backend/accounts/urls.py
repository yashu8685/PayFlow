from django.urls import path
from .views import hello, register

urlpatterns = [
    path("hello/", hello),
    path("register/", register),
]