from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import CarModel
from .serializers import CarSerializer


class CarListCreateView(ListCreateAPIView):
    serializer_class = CarSerializer

    def get_queryset(self):
        qs = CarModel.objects.all()
        autoParkId = self.request.query_params.get('autoParkId', None)
        print('self.request.query_params =', self.request.query_params)
        print('self.request =', self.request)
        print('autoParkId =', autoParkId)
        if autoParkId:
            qs = qs.filter(auto_park_id=autoParkId)

        return qs


class CarReadUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = CarModel.objects.all()
    serializer_class = CarSerializer
