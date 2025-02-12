from django.contrib import admin
from .models import CustomUser, Farmer,Harvest,Payment,HarvestUser

admin.site.register(CustomUser)
admin.site.register(Harvest)
admin.site.register(HarvestUser)
admin.site.register(Payment)
admin.site.register(Farmer)

