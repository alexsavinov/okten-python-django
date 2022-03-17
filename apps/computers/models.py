from django.db import models


class ComputerModel(models.Model):
    class Meta:
        db_table = 'computers'
        verbose_name = 'Computer'

    brand = models.CharField(max_length=30)
    model = models.CharField(max_length=30)
    ram = models.IntegerField()
    monitor = models.IntegerField()

    def __str__(self):
        return self.brand
