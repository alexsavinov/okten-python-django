from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from backend.apps.cars.models import CarModel
from backend.apps.cars.serializers import CarSerializer
from pagination.default_pagination import DefaultPagination
from backend.apps.cars.filters import CarFilter


class CarListCreateView(ListAPIView):
    """
    Get all cars with filters
    """
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = CarSerializer
    pagination_class = DefaultPagination
    queryset = CarModel.objects.all()
    filterset_class = CarFilter

    # def get_queryset(self):
    #     qs = CarModel.objects.all()
    #     autoParkId = self.request.query_params.get('autoParkId', None)
    #     if autoParkId:
    #         qs = qs.filter(auto_park_id=autoParkId)
    #
    #     return qs


class CarReadUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    """
    get:
        Get car by id
    put:
        Update car by id
    patch:
        Partial update by id
    delete:
        Delete car by id
    """
    queryset = CarModel.objects.all()
    serializer_class = CarSerializer


class CarDestroyView(DestroyAPIView):
    queryset = CarModel.objects.all()
    serializer_class = CarSerializer
