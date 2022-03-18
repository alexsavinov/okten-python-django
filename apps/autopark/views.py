from rest_framework.generics import ListCreateAPIView, CreateAPIView

from .serializers import AutoParkSerializer
from .models import AutoParkModel
from apps.cars.serializers import CarSerializer


class AutoParkListCreateView(ListCreateAPIView):
    serializer_class = AutoParkSerializer
    queryset = AutoParkModel.objects.all()


class AutoParkAddCarView(CreateAPIView):
    serializer_class = CarSerializer
    queryset = AutoParkModel.objects.all()

    def perform_create(self, serializer):
        auto_park = self.get_object()
        serializer.save(auto_park=auto_park)
