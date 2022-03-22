from django.urls import path

from .views import CarListCreateView, CarReadUpdateDeleteView

urlpatterns = [
    path('', CarListCreateView.as_view(), name='cars_list_create'),
    path('?autoParkId=<int:autoParkId>', CarListCreateView.as_view(), name='cars_list_by_park_id'),
    path('/<int:autoParkId>', CarListCreateView.as_view(), name='cars_create'),
    path('/<int:pk>', CarReadUpdateDeleteView.as_view(), name='cars_read_update_delete')
]
