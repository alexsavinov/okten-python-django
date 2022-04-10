from django_filters import rest_framework as filters

from .models import CarModel


class CarFilter(filters.FilterSet):
    price_lt = filters.NumberFilter(field_name='price', lookup_expr='lt')
    price = filters.RangeFilter()  # price price_min price_max
    brand_starts = filters.CharFilter(field_name='brand', lookup_expr='istartswith')

    class Meta:
        model = CarModel
        fields = ['id', 'auto_park', 'price_lt', 'price', 'brand_starts']
