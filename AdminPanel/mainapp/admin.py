from django.contrib import admin
# Register your models here.
from .models import CustomUser,ParkingSpace,  DetectedVehicle 

admin.site.register(CustomUser),
admin.site.register(ParkingSpace),
admin.site.register(DetectedVehicle)


