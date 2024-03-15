from typing import Any
from django.shortcuts import render
from cake.models import Brand
from django.views.generic import TemplateView
from .models import Contact
class AboutView(TemplateView):
    template_name = "about.html"
    
class ClientsView(TemplateView):
    template_name = "clients.html"
    
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        content =  super().get_context_data(**kwargs)

        content['brands'] = Brand.objects.all()
        
        return content
    
class ContactView(TemplateView):
    template_name = 'contact.html'
    
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        content=  super().get_context_data(**kwargs)

        content['contacts'] = Contact.objects.all()
        
        return content
        