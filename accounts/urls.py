from django.urls import path
from .views import RegisterView, LoginView
from .views import FarmerListCreateView, FarmerDetailView, HarvestListCreateView,ApproveView, HarvestDetailView, reject_harvest, PaymentListCreateView, PaymentDetailView, mark_payment_paid, ReportView
from .views import FarmerProfileView, HarvestListView, PaymentListView, get_harvests_byId, amount_owed, get_farmers, get_users,get_profile,get_harvests,record_harvests,DeleteUser


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('api/farmers/', FarmerListCreateView.as_view(), name='farmers-list-create'),
    path('api/farmers/<int:pk>/', FarmerDetailView.as_view(), name='farmer-detail'),
    path('api/harvests/', HarvestListCreateView.as_view(), name='harvests-list-create'),
    path('api/harvests/<int:pk>/', HarvestDetailView.as_view(), name='harvest-detail'),
     path('api/approve/<int:id>/', ApproveView.as_view(), name='approve-view'),
    
    path('api/get-harvests/<int:id>/reject/', reject_harvest, name='reject-harvest'),
    path('api/payments/', PaymentListCreateView.as_view(), name='payments-list-create'),
    path('api/payments/<int:pk>/', PaymentDetailView.as_view(), name='payment-detail'),
    path('api/payments/<int:pk>/mark-paid/', mark_payment_paid, name='mark-payment-paid'),
    path('api/reports/', ReportView.as_view(), name='reports'),
    path('farmers/<int:pk>/', FarmerProfileView.as_view(), name="farmer-profile"),
    path('farmers/<int:farmer_id>/harvests/', HarvestListView.as_view(), name="harvest-history"),
    path('farmers/<int:farmer_id>/payments/', PaymentListView.as_view(), name="payment-history"),
    path('farmers/<int:farmer_id>/amount-owed/', amount_owed, name="amount-owed"),
    path('api/get-farmers/', get_farmers, name='get_farmers'),
    path('api/get-users/', get_users, name='get-users'),
    path('api/get-profile/<int:id>/', get_profile, name='get-profile'),
    path('api/get-harvests/', get_harvests, name='get-harvests'),
    path('api/get_harvests_byId/<int:id>/', get_harvests_byId, name='get_harvests_byId'),
    path('api/record_harvests/', record_harvests, name='record_harvests'),
    path('api/delete_user/<int:id>/', DeleteUser.as_view(), name='DeleteUser'),
    

]


