# Generated by Django 2.2.5 on 2019-10-29 23:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('biapi', '0006_auto_20191029_2119'),
    ]

    operations = [
        migrations.CreateModel(
            name='Demand',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Name')),
                ('region', models.CharField(blank=True, max_length=100, null=True, verbose_name='Region')),
                ('subRegion', models.CharField(blank=True, max_length=100, null=True)),
                ('country', models.CharField(blank=True, max_length=100, null=True)),
                ('filterdemand', models.CharField(blank=True, max_length=100, null=True)),
                ('year', models.IntegerField(blank=True, null=True)),
                ('product', models.CharField(blank=True, max_length=100, null=True)),
                ('unit', models.CharField(blank=True, max_length=100, null=True)),
                ('pfmo', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'verbose_name': 'Demand',
                'verbose_name_plural': 'Demands',
            },
        ),
    ]
