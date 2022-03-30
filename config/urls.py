from django.conf.urls.static import static
from django.urls import include, path
from config import settings

urlpatterns = [
                  path('api/v1', include('api.api_v1'))
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
