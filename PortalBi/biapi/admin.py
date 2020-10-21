from django.contrib import admin
from . import models

admin.site.site_header = 'BI-Portal Administration'
admin.site.site_title = 'BI-Portal Admin Area'
admin.site.index_title = "Welcome to BI-Portal Admin Area"

admin.site.register(models.Country)
admin.site.register(models.Source_Externe)
admin.site.register(models.NatureValue)
admin.site.register(models.Product)
admin.site.register(models.Client)
admin.site.register(models.Peer)
admin.site.register(models.App_Interne)
admin.site.register(models.Thematic_App)
admin.site.register(models.Value)
admin.site.register(models.UnitValue)
admin.site.register(models.Frequency)
admin.site.register(models.IndicatorCategory)
admin.site.register(models.Indicator)
admin.site.register(models.Source)
admin.site.register(models.TypeValue)
