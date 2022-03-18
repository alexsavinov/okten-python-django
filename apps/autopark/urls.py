from django.urls import path

from .views import AutoParkListCreateView, AutoParkAddCarView

urlpatterns = [
    path('', AutoParkListCreateView.as_view(), name='autopark_list_create'),
    path('/<int:pk>/add_car', AutoParkAddCarView.as_view(), name='autopark_add_car')
]
