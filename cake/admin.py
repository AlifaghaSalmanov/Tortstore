from django.contrib import admin

# Register your models here.
from . import models

admin.site.register(models.Brand)

admin.site.register(models.Cake)

admin.site.register(models.Image)

admin.site.register(models.Category)

admin.site.register(models.Color)

admin.site.register(models.SocialMedia)