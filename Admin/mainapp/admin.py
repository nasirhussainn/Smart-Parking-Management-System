from django.contrib import admin
# Register your models here.
from .models import*

admin.site.register(CustomUser)
admin.site.register(ParkingSpace)
admin.site.register(Slot_reservation)

