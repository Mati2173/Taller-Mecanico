from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.decorators import action
from rest_framework import viewsets
from .models import Vehicle, Service
from .serializers import VehicleSerializer, VehicleWithServicesSerializer, ServiceSerializer


class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            self.serializer_class = VehicleWithServicesSerializer
        else:
            self.serializer_class = VehicleSerializer

        return super().get_serializer_class()

    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        """
        Custom action to filter vehicles
        """
        # Filters
        number_plate = request.query_params.get('number_plate')
        brand = request.query_params.get('brand')
        model = request.query_params.get('model')
        year = request.query_params.get('year')
        owner_name = request.query_params.get('owner_name')

        # QuerySet
        queryset = Vehicle.objects.all()
        if number_plate:
            queryset = queryset.filter(number_plate__icontains=number_plate)
        if brand:
            queryset = queryset.filter(brand__icontains=brand)
        if model:
            queryset = queryset.filter(model__icontains=model)
        if year:
            queryset = queryset.filter(year=year)
        if owner_name:
            queryset = queryset.filter(owner_name__icontains=owner_name)

        serializer = VehicleSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='no_services/(?P<number_plate>[^/.]+)')
    def no_services(self, request, number_plate):
        """
        Custom action to obtain a vehicle without the associated services
        """
        try:
            vehicle = Vehicle.objects.get(number_plate=number_plate)
        except Vehicle.DoesNotExist:
            raise NotFound(detail="No Vehicle matches the given query.")

        serializer = VehicleSerializer(vehicle)
        return Response(serializer.data)


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
