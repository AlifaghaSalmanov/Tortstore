from typing import Any
from django.shortcuts import render
from django.views.generic import TemplateView

from .models import Cake, Brand

class MainPageView( TemplateView ):
    template_name = "index.html"
    
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)

        context["cakes"]=  Cake.objects.all().order_by("-updated_at")
        context["brands"] = Brand.objects.all()
        
        return context
    
    
class CakeDetailView(TemplateView):
    template_name = "products-details.html"
    
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)

        context["cake"] = Cake.objects.get(id=kwargs["id"])
        
        context["cakes"] = Cake.objects.all().order_by("-updated_at")
        
        return context