from django.urls import path
from .views import RegisterView, LoginView
from .views import FarmerListCreateView, FarmerDetailView, HarvestListCreateView, HarvestDetailView, approve_harvest, reject_harvest, PaymentListCreateView, PaymentDetailView, mark_payment_paid, ReportView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('api/farmers/', FarmerListCreateView.as_view(), name='farmers-list-create'),
    path('api/farmers/<int:pk>/', FarmerDetailView.as_view(), name='farmer-detail'),
    path('api/harvests/', HarvestListCreateView.as_view(), name='harvests-list-create'),
    path('api/harvests/<int:pk>/', HarvestDetailView.as_view(), name='harvest-detail'),
    path('api/harvests/<int:pk>/approve/', approve_harvest, name='approve-harvest'),
    path('api/harvests/<int:pk>/reject/', reject_harvest, name='reject-harvest'),
    path('api/payments/', PaymentListCreateView.as_view(), name='payments-list-create'),
    path('api/payments/<int:pk>/', PaymentDetailView.as_view(), name='payment-detail'),
    path('api/payments/<int:pk>/mark-paid/', mark_payment_paid, name='mark-payment-paid'),
    path('api/reports/', ReportView.as_view(), name='reports'),
]


