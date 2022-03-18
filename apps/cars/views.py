from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import CarModel
from .serializers import CarSerializer

class CarListCreateView(APIView):
    def get(self, *args, **kwargs):
        Cars = CarModel.objects.all()
        serializer = CarSerializer(Cars, many=True)
        return Response(serializer.data, status.HTTP_200_OK)

    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = CarSerializer(data=data)

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data, status.HTTP_201_CREATED)


class CarReadUpdateDeleteView(APIView):
    def get(self, *args, **kwargs):
        pk = kwargs.get('pk')

        if not CarModel.objects.filter(pk=pk).exists():
            return Response('Car with this id is not exists', status.HTTP_404_NOT_FOUND)

        Car = CarModel.objects.get(pk=pk)
        serializer = CarSerializer(Car)
        return Response(serializer.data, status.HTTP_200_OK)

    def put(self, *args, **kwargs):
        pk = kwargs.get('pk')
        data = self.request.data

        if not CarModel.objects.filter(pk=pk).exists():
            return Response('Car with this id is not exists', status.HTTP_404_NOT_FOUND)

        Car = CarModel.objects.get(pk=pk)
        serializer = CarSerializer(Car, data=data)

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data, status.HTTP_200_OK)

    def patch(self, *args, **kwargs):
        pk = kwargs.get('pk')
        data = self.request.data

        if not CarModel.objects.filter(pk=pk).exists():
            return Response('Car with this id is not exists', status.HTTP_404_NOT_FOUND)

        Car = CarModel.objects.get(pk=pk)
        serializer = CarSerializer(Car, data, partial=True)

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data, status.HTTP_200_OK)

    def delete(self, *args, **kwargs):
        pk = kwargs.get('pk')

        if not CarModel.objects.filter(pk=pk).exists():
            return Response('Car with this id is not exists', status.HTTP_404_NOT_FOUND)

        Car = CarModel.objects.get(pk=pk)
        Car.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
