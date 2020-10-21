# Generated by Django 2.2.5 on 2019-10-29 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('biapi', '0004_auto_20191028_0907'),
    ]

    operations = [
        migrations.AddField(
            model_name='value',
            name='country',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='Country'),
        ),
        migrations.AddField(
            model_name='value',
            name='dataSet',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='Data Set'),
        ),
        migrations.AddField(
            model_name='value',
            name='units',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='Units'),
        ),
    ]
