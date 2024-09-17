from django.db import models


class Vehicle(models.Model):
    """Vehicle model"""

    class Meta:
        """Metadata"""
        verbose_name = 'vehicle'
        verbose_name_plural = 'vehicles'
        ordering = ['number_plate']

    # Attributes
    number_plate = models.CharField(max_length=15, unique=True, primary_key=True)
    brand = models.CharField(max_length=20, blank=True, null=True)
    model = models.CharField(max_length=50, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    owner_name = models.CharField(max_length=100, blank=True, null=True)
    owner_phone = models.CharField(max_length=15, blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.number_plate:
            self.number_plate = self.number_plate.upper().strip()
        if self.owner_name:
            self.owner_name = self.owner_name.title()

        super().save(*args, **kwargs)

    def __str__(self):
        """String representation of the vehicle"""
        return self.number_plate


class Service(models.Model):
    """Vehicle model"""

    class Meta:
        """Metadata"""
        verbose_name = 'service'
        verbose_name_plural = 'services'
        ordering = ['-date']

    # Attributes
    vehicle = models.ForeignKey(Vehicle, related_name='services', on_delete=models.CASCADE, to_field='number_plate')
    date = models.DateField(blank=True, null=True)
    kilometer_age = models.IntegerField(blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.title:
            self.title = self.title[0].upper() + self.title[1:]

        super().save(*args, **kwargs)

    def __str__(self):
        """String representation of the service"""
        return f"{self.vehicle.number_plate} - {self.title}"
