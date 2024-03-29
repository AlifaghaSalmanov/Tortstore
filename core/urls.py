from django.urls import path

from . import views

urlpatterns = [
    path('about/', views.AboutView.as_view(), name='about'),
    path('clients/', views.ClientsView.as_view(), name='clients'),
    path('contact/', views.ContactView.as_view(), name='contact')
]