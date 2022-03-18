from django.urls import path

from .views import CarListCreateView, CarReadUpdateDeleteView

urlpatterns = [
    path('', CarListCreateView.as_view(), name='cars_list_create'),
    path('/<int:pk>', CarReadUpdateDeleteView.as_view(), name='cars_read_update_delete')
]
