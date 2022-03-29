from rest_framework.generics import CreateAPIView, ListCreateAPIView, RetrieveDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from apps.cars.serializers import CarSerializer

from .models import AutoParkModel
from .serializers import AutoParkSerializer


class AutoParkListCreateView(ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = AutoParkSerializer
    queryset = AutoParkModel.objects.all()


class AutoParkRetrieveDestroyAPIView(RetrieveDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = AutoParkSerializer
    queryset = AutoParkModel.objects.all()


class AutoParkAddCarView(CreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = CarSerializer
    queryset = AutoParkModel.objects.all()

    def perform_create(self, serializer):
        auto_park = self.get_object()
        serializer.save(auto_park=auto_park)
