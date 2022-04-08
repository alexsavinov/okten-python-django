from django.urls import path

from backend.apps.cars.views import CarDestroyView, CarListCreateView, CarReadUpdateDeleteView

urlpatterns = [
    path('', CarListCreateView.as_view(), name='cars_list_create'),
    path('/<int:auto_park>', CarListCreateView.as_view(), name='cars_create'),
    path('/<int:pk>', CarReadUpdateDeleteView.as_view(), name='cars_read_update_delete'),
    path('/<int:pk>/<int:auto_park>', CarDestroyView.as_view(), name='cars_delete')
]
