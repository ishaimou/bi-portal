# from django.conf.urls import url

from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('countries', views.ListCreateCountry, basename='countries')
router.register('products', views.ListCreateProduct, basename='products')
router.register('clients', views.ListCreateClient, basename='clients')
router.register('peers', views.ListCreatePeer, basename='peers')
router.register('appinterne', views.App_InterneViewSet, basename='appinterne')
router.register('thematic', views.Thematic_AppViewSet, basename='thematic')
router.register('sourceexterne', views.Source_ExterneViewSet,
                basename='sourceexterne')
router.register('values', views.ValueViewSet, basename='values')
router.register('indicators', views.IndicatorViewSet, basename='indicators')
router.register('indicatorscategory',
                views.IndicatorCategoryViewSet, basename='indicatorscategory')
router.register('naturevalue', views.NatureValueViewSet,
                basename='naturevalue')
router.register('demand', views.DemandViewSet, basename='demand')
router.register('volumes', views.ValueVolumeViewSet, basename='volumes')
router.register('valuecsv', views.ValueCSVViewSet, basename='valuecsv')
router.register('demandcsv', views.DemandCSVViewSet, basename='demandcsv')
router.register('sourcecsv', views.SourceCSVViewSet, basename='sourcecsv')
router.register('frequencycsv', views.FrequencyCSVViewSet,
                basename='frequencycsv')
router.register('indicatorcsv', views.IndicatorCSVViewSet,
                basename='indicatorcsv')
router.register('indicatorcategorycsv',
                views.IndicatorCategoryCSVViewSet, basename='indicatorcategorycsv')
router.register('naturevaluecsv', views.NatureValueCSVViewSet,
                basename='naturevaluecsv')
router.register('typevaluecsv', views.TypeValueCSVViewSet,
                basename='typevaluecsv')
router.register('unitvaluecsv', views.UnitValueCSVViewSet,
                basename='unitvaluecsv')

# router.register('forcast', views.ValueForcastViewSet, basename='forcast')
# router.register('test', views.ValuePostViewSet, basename='test')


urlpatterns = [
    # url(r'^$', views.ListCreateClient.as_view(), name='client_list'),
    # url(r'^$', views.ListCreatePeer.as_view(), name='peer_list'),
    path('api/', include(router.urls)),
    path('loadindicator/', views.LoadCsv_indicator.as_view()),
    path('loadcmd/', views.LoadCsv_comdprices.as_view()),
    path('loadvaluescru/', views.LoadValuesCRU.as_view()),
    path('loaddemandcru/', views.LoadDemandCru.as_view()),
    path('loadmacrofacto/', views.LoadMacroFacto.as_view()),
    path('loaddemandfert/', views.LoadDemandFertecon.as_view()),
    path('loadsuplyfert/', views.LoadSupplyFertecon.as_view()),
    path('loadvolumeifa/', views.LoadVolumeIFA.as_view()),
    path('updatedemandfert/', views.UpdateDemandFert.as_view()),
    path('updatesupplyfert/', views.UpdateSupplyFert.as_view()),
    path('loadforcastcru/', views.LoadForcastCru.as_view()),
]
