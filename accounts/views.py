from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import NotFound
from django.contrib.auth import login
from django.db.models import Sum
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from .models import Farmer, Harvest, Payment,CustomUser, HarvestUser
from .serializers import (
    RegisterSerializer, LoginSerializer, UserSerializer,
    FarmerSerializer, HarvestSerializer, PaymentSerializer
)
from .serializers import HarvestSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful!"}, status=status.HTTP_201_CREATED)
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
    permission_classes = [AllowAny]
    
    def get(self, request):
        total_harvest = Harvest.objects.filter(status="Approved").aggregate(total_kilos=Sum('kilos'))["total_kilos"] or 0
        total_payments = Payment.objects.filter(is_paid=True).aggregate(total_amount=Sum('amount'))["total_amount"] or 0
        return Response({"total_harvest": total_harvest, "total_payments": total_payments})

class FarmerListCreateView(generics.ListCreateAPIView):
    queryset = Farmer.objects.all()
    serializer_class = FarmerSerializer
    permission_classes = [AllowAny]

class FarmerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Farmer.objects.all()
    serializer_class = FarmerSerializer
    permission_classes = [AllowAny]

class HarvestListCreateView(generics.ListCreateAPIView):
    queryset = Harvest.objects.all()
    serializer_class = HarvestSerializer
    permission_classes = [AllowAny]

class HarvestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Harvest.objects.all()
    serializer_class = HarvestSerializer
    permission_classes = [AllowAny]

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def approve_harvest(request, id):
#     harvest = get_object_or_404(Harvest, id=id)
#     harvest.status = 'Approved'
#     harvest.save()
#     return Response({"message": "Harvest approved"})


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def approve_harvest(request, id):
#     try:
#         # Try to fetch the harvest record by id
#         harvest = Harvest.objects.get(id=id)
#         harvest.status = 'Approved'
#         harvest.save()
#         print(harvest )
#         return Response({"message": "Harvest approved"})
#     except Harvest.DoesNotExist:
#         return Response({"detail": "No Harvest matches the given query."}, status=404)




@api_view(['POST'])
@permission_classes([AllowAny])
def reject_harvest(request, pk):
    harvest = get_object_or_404(Harvest, pk=pk)
    harvest.status = 'Rejected'
    harvest.save()
    return Response({"message": "Harvest rejected"})

class PaymentListCreateView(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [AllowAny]

class PaymentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [AllowAny]

@api_view(['POST'])
@permission_classes([AllowAny])
def mark_payment_paid(request, pk):
    payment = get_object_or_404(Payment, pk=pk)
    payment.is_paid = True
    payment.save()
    return Response({"message": "Payment marked as paid"})

class FarmerProfileView(generics.RetrieveAPIView):
    serializer_class = FarmerSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Farmer.objects.filter(user=self.request.user)


class HarvestListView(generics.ListCreateAPIView):
    serializer_class = HarvestSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Harvest.objects.filter(farmer__user=self.request.user)

class PaymentListView(generics.ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Payment.objects.filter(farmer__user=self.request.user)

@api_view(["GET"])
@permission_classes([AllowAny])
def amount_owed(request):
    farmer = get_object_or_404(Farmer, user=request.user)
    total_owed = sum(harvest.kilos * 10 for harvest in farmer.harvests.filter(status="Approved"))
    return Response({"amount": total_owed})

@api_view(['GET'])
def get_farmers(request):
    farmers = Farmer.objects.all()
    serializer = FarmerSerializer(farmers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_users(request):
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_profile(request, id):
    user = CustomUser.objects.get(id=id)
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['GET'])
def get_harvests(request):
    harvests = HarvestUser.objects.all()
    serializer = HarvestSerializer(harvests, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_harvests_byId(request, id):
    harvests = HarvestUser.objects.filter(user__id=id)
    serializer = HarvestSerializer(harvests, many=True)
    return Response(serializer.data)



# @api_view(['POST'])
# def record_harvests(request):
#     serializer = HarvestSerializer(data=request.data)

#     if serializer.is_valid():

#         userid = request.data.get('userid')
#         if userid:
#             try:
        
#                 user = CustomUser.objects.get(id=userid)
            
#                 serializer.validated_data["user"] = user
#             except CustomUser.DoesNotExist:
#                 return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        
#         serializer.save()

#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     else:
#         print(f"Validation Errors: {serializer.errors}")
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# def record_harvests(request):
#     serializer = HarvestSerializer(data=request.data)

#     if serializer.is_valid():
        
#         serializer.save()

#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     else:
#         print(f"Validation Errors: {serializer.errors}")
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def record_harvests(request):
    try:
        serializer = HarvestSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {
                'detail': 'Validation failed',
                'errors': serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'detail': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    


class DeleteUser(APIView):
    def delete(self, request, pk):
        try:
            user = CustomUser.objects.get(id=pk)
            user.delete()
            return Response({"message": "user deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except CustomUser.DoesNotExist:
            raise NotFound(detail="user not found")
        
class ApproveView(APIView):
    permission_classes = [AllowAny]
    def put(self, request, *args, **kwargs):
        approve_id = kwargs.get('id')
        try:
            user = HarvestUser.objects.get(id=approve_id)
        except HarvestUser.DoesNotExist:
            return Response({"detail": "harvest not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = HarvestSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)