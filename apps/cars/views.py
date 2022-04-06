from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import CarModel
from .serializers import CarSerializer
from pagination.default_pagination import DefaultPagination


class CarListCreateView(ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = CarSerializer
    pagination_class = DefaultPagination

    def get_queryset(self):
        qs = CarModel.objects.all()
        autoParkId = self.request.query_params.get('autoParkId', None)
        if autoParkId:
            qs = qs.filter(auto_park_id=autoParkId)

        return qs


class CarReadUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = CarModel.objects.all()
    serializer_class = CarSerializer
