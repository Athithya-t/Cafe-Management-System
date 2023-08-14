from django.contrib import admin
from .models import Dining
from .models import Order

admin.site.register(Dining)
admin.site.register(Order)