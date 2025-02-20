from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser
from .models import Farmer, Harvest, Payment, HarvestUser
from django.db.models import Sum

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'role']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role']
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials")
    

   

from rest_framework import serializers
from .models import Farmer, Payment

class FarmerSerializer(serializers.ModelSerializer):
    total_payments = serializers.SerializerMethodField()

    class Meta:
        model = Farmer
        fields = ['id', 'name', 'phone', 'total_payments']  

    def get_total_payments(self, obj):
        
        total_payments = Payment.objects.filter(farmer=obj, is_paid=True).aggregate(Sum('amount'))['amount__sum'] or 0
        return total_payments


 
from rest_framework import serializers
from .models import Harvest, CustomUser




class HarvestSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    userdetails = UserSerializer(read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = HarvestUser
        fields = ["id", "user", "username","userdetails", "date", "kilos", "label", 'status', "message"]

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

