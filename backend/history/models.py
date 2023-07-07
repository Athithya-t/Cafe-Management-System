from django.db import models
from kitchen import models as kitchen_models

# Create your models here.
class Dining(models.Model):
    mobile = models.CharField(max_length=10)
    table_no = models.IntegerField()
    login = models.DateTimeField(auto_now_add = True)
    logout = models.DateTimeField(null = True)


class Order(models.Model):
    dining_id = models.ForeignKey(Dining, on_delete=models.CASCADE)
    item_id = models.ForeignKey(kitchen_models.Item, on_delete=models.SET_NULL, null=True)