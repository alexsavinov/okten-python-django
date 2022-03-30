from django.urls import include, path

urlpatterns = [
    path('/cars', include('apps.cars.urls')),
    path('/auto_parks', include('apps.autopark.urls')),
    path('/users', include('apps.user.urls')),
    path('/auth', include('apps.auth.urls'))
]
