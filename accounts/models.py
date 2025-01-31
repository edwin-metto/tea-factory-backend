from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('farmer', 'Farmer'),
        ('manager', 'Manager'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, null=True, blank=True)


class Farmer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.name



class Harvest(models.Model):
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    kilos = models.FloatField()
    status = models.CharField(
        max_length=10, choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')],
        default='Pending'
    )

    def __str__(self):
        return f"{self.farmer.user.username} - {self.kilos}kg on {self.date} ({self.status})"
    
class Payment(models.Model):
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.farmer.user.username} - ${self.amount} on {self.date} ({'Paid' if self.is_paid else 'Pending'})"

