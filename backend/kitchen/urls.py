from django.urls import path
from . import views

urlpatterns = [
    path("category/", views.CategoryListView.as_view(), name = 'category'),

    path("category/<int:pk>", views.CategoryRUDView.as_view(), name = "category-rud"),

    path("item/category_<int:pk>", views.ItemByCategory.as_view(), name = 'item_by_category'),

    path("item/", views.ItemListView.as_view(), name = 'item'),

    path("item/<int:pk>", views.ItemRUDView.as_view(), name = "item-rud")
]   