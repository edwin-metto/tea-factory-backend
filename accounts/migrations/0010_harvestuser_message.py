# Generated by Django 5.1.4 on 2025-02-12 11:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_harvestuser_label'),
    ]

    operations = [
        migrations.AddField(
            model_name='harvestuser',
            name='message',
            field=models.CharField(default='pending..'),
        ),
    ]
