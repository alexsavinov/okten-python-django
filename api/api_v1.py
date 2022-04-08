import os

from django.urls import include, path
from drf_yasg.generators import OpenAPISchemaGenerator

from rest_framework.permissions import AllowAny

from drf_yasg import openapi
from drf_yasg.views import get_schema_view


class SchemaGenerator(OpenAPISchemaGenerator):
    def get_schema(self, request=None, public=False):
        schema = super(SchemaGenerator, self).get_schema(request, public)
        schema.basePath = os.path.join(schema.basePath, '/api/v1')
        return schema


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
    generator_class=SchemaGenerator,
)

urlpatterns = [
    path('/cars', include('apps.cars.urls')),
    path('/auto_parks', include('apps.autopark.urls')),
    path('/users', include('apps.user.urls')),
    path('/auth', include('apps.auth.urls')),
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
