import os

from django.urls import include, path
from drf_yasg.generators import OpenAPISchemaGenerator

from rest_framework.permissions import AllowAny

from drf_yasg import openapi
from drf_yasg.views import get_schema_view

schema_view = get_schema_view(
    openapi.Info(
        title="Autoparks API",
        default_version='v1',
        description="About cars",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(AllowAny,),
)

urlpatterns = [
    path('/cars', include('apps.cars.urls')),
    path('/auto_parks', include('apps.autopark.urls')),
    path('/users', include('apps.user.urls')),
    path('/auth', include('apps.auth.urls')),
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
