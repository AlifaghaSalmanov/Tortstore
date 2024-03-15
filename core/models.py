from django.db import models

# Create your models here.
class Contact(models.Model):
    
    class ContactType(models.TextChoices):
        Email = 'Email', 'Email'
        Phone = 'Phone', 'Phone'
        Address = 'Address', 'Address'
    
    icon = models.ImageField(upload_to='contact_icons')
    type = models.CharField(max_length=100, choices=ContactType.choices, null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    detail = models.TextField(null=True, blank=True)
    
    def __str__(self) -> str:
        return self.name