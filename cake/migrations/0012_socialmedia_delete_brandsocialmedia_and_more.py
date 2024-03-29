# Generated by Django 4.1.2 on 2024-03-15 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cake', '0011_remove_brandsocialmedia_name_brandsocialmedia_img'),
    ]

    operations = [
        migrations.CreateModel(
            name='SocialMedia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(blank=True, null=True, upload_to='brands')),
                ('link', models.URLField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.DeleteModel(
            name='BrandSocialMedia',
        ),
        migrations.AddField(
            model_name='brand',
            name='social_media',
            field=models.ManyToManyField(blank=True, to='cake.socialmedia'),
        ),
    ]
