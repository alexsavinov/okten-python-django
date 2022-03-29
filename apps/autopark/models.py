from django.core import validators as V
from django.db import models


class AutoParkModel(models.Model):
    class Meta:
        db_table = 'autopark'

    name = models.CharField(max_length=30, validators=(
        V.MaxLengthValidator(30),
        V.MinLengthValidator(2),
    ))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
