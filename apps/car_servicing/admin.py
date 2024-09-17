from django.contrib import admin
from .models import Vehicle, Service


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('number_plate', 'brand', 'model', 'year', 'owner_name', 'owner_phone')
    search_fields = ('number_plate', 'brand', 'model', 'owner_name')


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('vehicle', 'date', 'kilometer_age', 'title')
    search_fields = ('vehicle__number_plate', 'title', 'description')
    list_filter = ('vehicle__number_plate', 'date')
