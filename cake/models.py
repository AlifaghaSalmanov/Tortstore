from django.db import models

# Create your models here.

class SocialMedia(models.Model):
    img = models.ImageField(upload_to='brands', null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    link = models.URLField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Brand(models.Model):
    name = models.CharField(max_length=100)
    img = models.ImageField(upload_to='brands', null=True, blank=True)
    is_premium = models.BooleanField(default=False)
    address =  models.CharField(max_length=100, null=True, blank=True)
    near_location = models.CharField(max_length=100, null=True, blank=True)
    phone_number  = models.CharField(max_length=100, null=True, blank=True)
    
    social_medias = models.ManyToManyField(SocialMedia, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    



    
    
class Image(models.Model):
    img = models.ImageField(upload_to='cakes', null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Color(models.Model):
    name = models.CharField(max_length=100)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class Category(models.Model):
    name = models.CharField(max_length=100)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class Cake(models.Model):
    
    class CakeType(models.TextChoices):
        VIP = 'vip', 'vip'
        PREMIUM = 'premium', 'premium'
        NORMAL = 'normal', 'normal'
    
    brand = models.ForeignKey(Brand, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=100)
    images = models.ManyToManyField(Image, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    old_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    type = models.CharField(choices=CakeType.choices, default=CakeType.NORMAL, max_length=20)
    
    
    kg = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    composition = models.TextField(null=True, blank=True)


    category = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL)
    color = models.ForeignKey(Color, null=True, on_delete=models.SET_NULL)
    
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)