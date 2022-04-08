from django.urls import path

from .views import AutoParkListCreateView, AutoParkAddCarView, AutoParkRetrieveDestroyAPIView

urlpatterns = [
    path('', AutoParkListCreateView.as_view(), name='autopark_list_create'),
    path('/<int:pk>', AutoParkRetrieveDestroyAPIView.as_view(), name='autopark_get_delete_by_id'),
    path('/<int:pk>/cars', AutoParkAddCarView.as_view(), name='autopark_add_car'),
]
