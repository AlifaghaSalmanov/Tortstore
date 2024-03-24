from django.urls import path

from . import views

urlpatterns = [
    path("", views.MainPageView.as_view(), name="index"),
    path("cakes/<int:id>/", views.CakeDetailView.as_view(), name="cake-detail"),
    path("cakes/", views.CakeListView.as_view(), name="cake-list"),
]
