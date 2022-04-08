from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from .views import ActivateUserView, CustomTokenObtainPairView

urlpatterns = [
    path('', CustomTokenObtainPairView.as_view(), name='login'),
    path('/refresh', TokenRefreshView.as_view(), name='refresh_tokens'),
    path('/activate/<str:token>', ActivateUserView.as_view(), name='auth_activate_user')
]
