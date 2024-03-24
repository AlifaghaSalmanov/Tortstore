from typing import Any
from django.shortcuts import render
from django.views.generic import TemplateView

from .models import Cake, Brand


class MainPageView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)

        context["cakes"] = Cake.objects.all().order_by("-updated_at")
        context["brands"] = Brand.objects.all()

        context["premium_cakes"] = Cake.objects.filter(type="premium").order_by(
            "-updated_at"
        )
        context["vip_cakes"] = Cake.objects.filter(type="vip").order_by("-updated_at")
        context["normal_cakes"] = Cake.objects.filter(type="normal").order_by(
            "-updated_at"
        )[:10]

        return context


class CakeDetailView(TemplateView):
    template_name = "products-details.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)

        context["cake"] = Cake.objects.get(id=kwargs["id"])

        context["cakes"] = Cake.objects.all().order_by("-updated_at")

        return context


class CakeListView(TemplateView):
    template_name = "products.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)

        context["cakes"] = Cake.objects.all().order_by("-updated_at")

        return context
