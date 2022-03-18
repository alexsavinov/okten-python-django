from django.db import models
from django.core import validators as V

from apps.autopark.models import AutoParkModel


class CarModel(models.Model):
    class Meta:
        db_table = 'cars'
        verbose_name = 'Car'

    brand = models.CharField(max_length=30, validators=(
        V.MaxLengthValidator(30),
        V.MinLengthValidator(2),
    ))
    price = models.IntegerField(
        validators=(V.MinValueValidator(1000), V.MaxValueValidator(100000)))
    year = models.IntegerField()
    auto_park = models.ForeignKey(AutoParkModel,
                                  on_delete=models.CASCADE, related_name='cars')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.brand
