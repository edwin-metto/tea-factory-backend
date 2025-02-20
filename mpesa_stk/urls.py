from django.urls import path
from mpesa_stk.views import *

urlpatterns =[
    path('stk/', stk_push,name='stk_push'),
]