from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=32, unique=True, null=False)

    def __str__(self):
        return f"{self.name}"
    

class Item(models.Model):
    name = models.CharField(max_length=32, unique=True, null=False)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    price = models.IntegerField(null=False)

    def __str__(self):
        return f"{self.name} - {self.category}"