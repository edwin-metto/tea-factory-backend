from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth import login
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Farmer, Harvest, Payment
from .serializers import FarmerSerializer, HarvestSerializer, PaymentSerializer
from rest_framework import generics
from django.shortcuts import get_object_or_404
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful!"}, status=status.HTTP_201_CREATED)
        print("Validation errors:", serializer.errors)  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            login(request, user)
            return Response({'id': user.id, 'role': user.role}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ReportView(APIView):
    def get(self, request):
        total_harvest = Harvest.objects.filter(status="Approved").aggregate(total_kilos=Sum('kilos'))["total_kilos"] or 0
        total_payments = Payment.objects.filter(is_paid=True).aggregate(total_amount=Sum('amount'))["total_amount"] or 0

        return Response({
            "total_harvest": total_harvest,
            "total_payments": total_payments
        })



class PaymentListCreateView(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class PaymentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


@api_view(['POST'])
def mark_payment_paid(request, pk):
    payment = get_object_or_404(Payment, pk=pk)
    payment.is_paid = True
    payment.save()
    return Response({"message": "Payment marked as paid"})

class FarmerListCreateView(generics.ListCreateAPIView):
    queryset = Farmer.objects.all()
    serializer_class = FarmerSerializer

class FarmerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Farmer.objects.all()
    serializer_class = FarmerSerializer




class HarvestListCreateView(generics.ListCreateAPIView):
    queryset = Harvest.objects.all()
    serializer_class = HarvestSerializer

class HarvestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Harvest.objects.all()
    serializer_class = HarvestSerializer


@api_view(['POST'])
def approve_harvest(request, pk):
    harvest = get_object_or_404(Harvest, pk=pk)
    harvest.status = 'Approved'
    harvest.save()
    return Response({"message": "Harvest approved"})


@api_view(['POST'])
def reject_harvest(request, pk):
    harvest = get_object_or_404(Harvest, pk=pk)
    harvest.status = 'Rejected'
    harvest.save()
    return Response({"message": "Harvest rejected"})
