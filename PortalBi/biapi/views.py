# from rest_framework import status
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework_csv import renderers as r
# from rest_framework.settings import api_settings
import csv
from rest_framework import viewsets
import pandas as pd
import math
from . import models
from rest_framework.views import APIView
from . import serializers
from rest_framework.response import Response
import os
from datetime import datetime
from django.http import HttpResponse
# from djqscsv import render_to_csv_response

# class ListCreateClient(APIView):
#     def get(self, request, format=None):
#         clients = models.Client.objects.all()
#         serializer = serializers.ClientSerializer(clients, many=True)
#         return Response(serializer.data)

#     def post(self, request, format=None):
#         serializer = serializers.ClientSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


class ListCreateCountry(viewsets.ModelViewSet):
    queryset = models.Country.objects.all()
    serializer_class = serializers.CountrySerializer


class ListCreateProduct(viewsets.ModelViewSet):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer


class ListCreateClient(viewsets.ModelViewSet):
    queryset = models.Client.objects.all().prefetch_related('country', 'products')
    serializer_class = serializers.ClientSerializer

# class RetrieveUpdateDestroyClient(viewsets.ModelViewSet):
#     queryset = models.Client.objects.all()
#     serializer_class = serializers.ClientSerializer


class ListCreatePeer(viewsets.ModelViewSet):
    queryset = models.Peer.objects.all().exclude(
        site="").prefetch_related('country', 'products')
    serializer_class = serializers.PeerSerializer


class Thematic_AppViewSet(viewsets.ModelViewSet):
    queryset = models.Thematic_App.objects.all()
    serializer_class = serializers.Thematic_AppSerializer


class App_InterneViewSet(viewsets.ModelViewSet):
    queryset = models.App_Interne.objects.all()
    serializer_class = serializers.App_InterneSerializer


class Source_ExterneViewSet(viewsets.ModelViewSet):
    queryset = models.Source_Externe.objects.all()
    serializer_class = serializers.Source_ExterneSerializer


# class ValueViewSet(viewsets.ViewSet):

#     queryset = models.Value.objects.all(). prefetch_related(
#         'unitValue', 'typeValue', 'frequency', 'indicator',
#         'source', 'natureValue')
#     serializer_class = serializers.ValueSerializer

#     def list(self, request):
#         indic = self.request.query_params.get('indicator', None)
#         # indic = request.data.get('indicator', None)
#         # indic = self.request.query_params.get('indicator', None)
#         # cntry = self.request.query_params.get('country', None)
#         # dset = self.request.query_params.get('dataset', None)
#         # filters = {}
#         # indicator = models.Indicator.objects.get(indicator=indic)
#         # if (indic is not None):
#         #     filters['indicator'] = indicator
#         # if (cntry is not None):
#         #     filters['country'] = cntry
#         # if (dset is not None):
#         #     filters['dataSet'] = dset
#         # queryset = models.Value.objects.filter(
#         #     **filters).prefetch_related(
#         #     'unitValue', 'typeValue', 'frequency', 'indicator',
#         #     'source', 'natureValue').order_by('date')[:10]
#         print(indic.split(','))
#         queryset = models.Value.objects.filter(
#             indicator__indicator__in=indic.split(',')
#         ).prefetch_related('unitValue', 'typeValue', 'frequency', 'indicator', 'source',
#                            'natureValue').order_by('date')
#         serializer = serializers.ValueSerializer(queryset, many=True)
#         # filter_backends = [filters.OrderingFilter]
#         # ordering_fields = ['date', 'value']
#         # ordering = ['date']
#         return (Response(serializer.data))

class ValueViewSet(viewsets.ViewSet):

    queryset = models.Value.objects.all(). prefetch_related(
        'unitValue', 'typeValue', 'frequency', 'indicator',
        'source', 'natureValue')
    serializer_class = serializers.ValueSerializer

    def list(self, request):
        # indic = request.data.get('indicator', None)
        indic = self.request.query_params.get('indicator', None)
        cntry = self.request.query_params.get('country', None)
        dset = self.request.query_params.get('dataset', None)
        frange = self.request.query_params.get('range', None)
        fsource = self.request.query_params.get('source', None)
        queryset = models.Value.objects.prefetch_related(
            'unitValue', 'typeValue', 'frequency', 'indicator',
            'source', 'natureValue').order_by('date')

        if (indic is not None):
            indicator = models.Indicator.objects.filter(
                indicator__in=indic.split(','))
            queryset = queryset.filter(indicator__in=indicator)
        if (cntry is not None):
            queryset = queryset.filter(country__in=cntry.split(','))
        if (dset is not None):
            queryset = queryset.filter(dataSet__in=dset.split(','))
        if (fsource is not None):
            source = models.Source.objects.filter(
                source__in=fsource.split(','))
            queryset = queryset.filter(source__in=source)
        # queryset = queryset.filter(forcast=False)
        queryset = queryset.order_by('date')
        if (frange is not None):
            queryset = queryset.filter(forcast=False)
            queryset = queryset.order_by('-date')[: int(frange)]
        result = {}
        serializer = serializers.ValueSerializer(queryset, many=True)
        for x in serializer.data:
            key = x.pop('indicator')
            if key not in result:
                result[key] = []
            result[key].append(x)
        return Response(result)


class DemandViewSet(viewsets.ModelViewSet):
    # views
    queryset = models.Demand.objects.all()
    serializer_class = serializers.DemandSerializer

    def list(self, request):
        fregion = self.request.query_params.get('region', None)
        fcountry = self.request.query_params.get('country', None)
        fproduct = self.request.query_params.get('product', None)
        fsource = self.request.query_params.get('source', None)
        ftype = self.request.query_params.get('type', None)
        frange = self.request.query_params.get('range', None)
        fmoy = 0
        fcruval = 0
        ffertval = 0
        ismoy = False
        iscru = False
        isfert = False
        p3 = ""
        p4 = ""
        queryset = models.Demand.objects.all()
        if (fregion is not None):
            queryset = queryset.filter(region__in=fregion.split(','))
        if (fproduct is not None):
            queryset = queryset.filter(product__in=fproduct.split(','))
        if (fsource is not None):
            allsources = fsource.split(',')
            if (len(allsources) > 1):
                ismoy = True
            queryset = queryset.filter(source__in=fsource.split(','))
        if (ftype is not None):
            queryset = queryset.filter(name__in=ftype.split(','))
        if (fcountry is not None):
            queryset = queryset.filter(country__in=fcountry.split(','))
        queryset = queryset.order_by('product', 'year')
        # queryset = queryset.order_by('year')
        if (frange is not None):
            queryset = queryset.order_by('-year')[: int(frange)]
        serializer = serializers.DemandSerializer(queryset, many=True)
        result = {}
        y = {}
        for x in serializer.data:
            key = x.pop('product')
            if (x["source"] == 'Fertecon'):
                if (key == 'DAP'):
                    x["pfmo"] = int(x["pfmo"] * 0.474936709)
                elif (key == 'MAP'):
                    x["pfmo"] = int(x["pfmo"] * 0.534683544)
                elif(key == 'NPK'):
                    x["pfmo"] = int(x["pfmo"] * 0.155634159)
                elif(key == 'TSP'):
                    x["pfmo"] = int(x["pfmo"] * 0.46)
                elif(key == 'SSP'):
                    x["pfmo"] = int(x["pfmo"] * 0.155634159)
                elif(key == 'NP'):
                    x["pfmo"] = int(x["pfmo"] * 0.469873418)
                isfert = True
                ffertval = x["pfmo"]
                p4 = key
            else:
                iscru = True
                fcruval = x["pfmo"]
                p3 = key
            if key not in result:
                result[key] = []
            result[key].append(x)
            if (isfert and iscru):
                fmoy = (fcruval + ffertval)/2
                y = {
                    "name": x["name"],
                    "region": x["region"],
                    "country": x["country"],
                    "year": x["year"],
                    "unit": x["unit"],
                    "pfmo": fmoy,
                    "p1": fcruval,
                    "p2": ffertval,
                    "p3": p3,
                    "p4": p4,
                    "source": "OCP"
                }
                if (x["year"] >= 2019):
                    result[key].append(y)
                isfert = False
                iscru = False
                fmoy = 0
                p3 = ""
                p4 = ""
            # print(x)
        return (Response(result))


class ValueVolumeViewSet(viewsets.ViewSet):

    queryset = models.Value.objects.all(). prefetch_related(
        'unitValue', 'typeValue', 'frequency', 'indicator',
        'source', 'natureValue')
    serializer_class = serializers.ValueSerializer

    def list(self, request):
        # indic = request.data.get('indicator', None)
        indic = self.request.query_params.get('indicator', None)
        queryset = models.Value.objects.all().prefetch_related('indicator').order_by('date')
        if (indic is not None):
            indicator = models.Indicator.objects.filter(
                indicator__in=indic.split(','))
            volume = models.NatureValue.objects.get(name='Volume')
            source = models.Source.objects.get(source='IFA')
            queryset = queryset.filter(indicator__in=indicator)
            queryset = queryset.filter(natureValue=volume)
            queryset = queryset.filter(source=source)
        queryset = queryset.order_by('date')
        serializer = serializers.VolumeSerializer(queryset, many=True)
        result = {}
        for x in serializer.data:
            key = x.pop('indicator')
            if key not in result:
                result[key] = []
            result[key].append(x)
        return (Response(result))


class IndicatorViewSet(viewsets.ModelViewSet):
    # views
    queryset = models.Indicator.objects.all()
    serializer_class = serializers.IndicatorSerializer


class IndicatorCategoryViewSet(viewsets.ModelViewSet):
    queryset = models.IndicatorCategory.objects.all()
    serializer_class = serializers.IndicatorCategorySerializer


class NatureValueViewSet(viewsets.ModelViewSet):
    queryset = models.NatureValue.objects.all()
    serializer_class = serializers.NatureValueSerializer


class ValueForcastViewSet(viewsets.ViewSet):

    queryset = models.Value.objects.all(). prefetch_related(
        'unitValue', 'typeValue', 'frequency', 'indicator',
        'source', 'natureValue')
    serializer_class = serializers.ValueSerializer

    def list(self, request):
        # indic = request.data.get('indicator', None)
        indic = self.request.query_params.get('indicator', None)
        cntry = self.request.query_params.get('country', None)
        dset = self.request.query_params.get('dataset', None)
        frange = self.request.query_params.get('range', None)
        fsource = self.request.query_params.get('source', None)
        queryset = models.Value.objects.prefetch_related(
            'unitValue', 'typeValue', 'frequency', 'indicator',
            'source', 'natureValue').order_by('date')

        if (indic is not None):
            indicator = models.Indicator.objects.filter(
                indicator__in=indic.split(','))
            queryset = queryset.filter(indicator__in=indicator)
        if (cntry is not None):
            queryset = queryset.filter(country__in=cntry.split(','))
        if (dset is not None):
            queryset = queryset.filter(dataSet__in=dset.split(','))
        if (fsource is not None):
            source = models.Source.objects.filter(
                source__in=fsource.split(','))
            queryset = queryset.filter(source__in=source)
        queryset = queryset.filter(forcast=True)
        queryset = queryset.order_by('date')
        if (frange is not None):
            queryset = queryset.order_by('-date')[:int(frange)]
        result = {}
        serializer = serializers.ValueSerializer(queryset, many=True)
        for x in serializer.data:
            key = x.pop('indicator')
            if key not in result:
                result[key] = []
            result[key].append(x)
        return Response(result)


class LoadCsv_indicator(APIView):
    # def get(self, request):
    #     BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    #     csv_file = BASE_DIR + '/indicator.csv'
    #     f = open(csv_file, 'r')
    #     f.readline()
    #     indicatorCategory = models.IndicatorCategory.objects.get(
    #         category='Commodity')
    #     for line in f:
    #         lst = line.split(',')
    #         indicator = models.Indicator()
    #         indicator.indicator = lst[0]
    #         indicator.description = lst[1]
    #         indicator.indicatorCategory = indicatorCategory
    #         indicator.save()
    #     f.close
    #     return Response('done')
    pass


class LoadValuesCRU(APIView):
    pass
    # def get(self, request):
    #     BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    #     cru = BASE_DIR + '/data/CRU historical Data P2O5 et raw material.xlsx'
    #     df = pd.read_excel(cru, 'Weekly')
    #     columns = df.columns.values
    #     indicatorCategory = models.IndicatorCategory.objects.get(
    #         category='Commodity')
    #     typeValue = models.TypeValue.objects.get(name='AVG')
    #     natureValue = models.NatureValue.objects.get(name='Price')
    #     frequency = models.Frequency.objects.get(frequency='Weekly')
    #     source = models.Source.objects.get(source='CRU')
    #     for index, row in df.iterrows():
    #         pass
    #         try:
    #             indicator = models.Indicator.objects.get(
    #                 indicator=row[1])
    #         except:
    #             indicator = models.Indicator()
    #             indicator.indicator = row[1]
    #             indicator.description = row[1]
    #             indicator.indicatorCategory = indicatorCategory
    #             indicator.save()
    #         unitValue = models.UnitValue.objects.get(unit=row[4])
    #         for i in range(6, len(columns)):
    #             value = models.Value()
    #             value.date = columns[i]
    #             value.indicator = indicator
    #             value.unitValue = unitValue
    #             value.typeValue = typeValue
    #             value.natureValue = natureValue
    #             value.frequency = frequency
    #             value.source = source
    #             value.dataSet = row[2]
    #             value.country = row[3]
    #             value.mass = row[5]
    #             value.value = row[i]
    #             value.save()
    #     return Response("done")


class LoadCsv_comdprices(APIView):
    # def get(self, request):
    #     BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    #     cru = BASE_DIR + '/data/tickers_hard_2.xlsm'
    #     df = pd.read_excel(cru, 'Feuil2')
    #     columns = df.columns
    #     indicatorCategory = models.IndicatorCategory.objects.get(
    #         category='Commodity')
    #     unitValue = models.UnitValue.objects.get(unit='USD')
    #     typeValue = models.TypeValue.objects.get(name='AVG')
    #     natureValue = models.NatureValue.objects.get(name='Price')
    #     frequency = models.Frequency.objects.get(frequency='Daily')
    #     source = models.Source.objects.get(source='Bloomberg')
    #     for i in range(0, len(columns), 2):
    #         indicator = models.Indicator.objects.get(indicator=columns[i])
    #         for index, row in df.iterrows():
    #             value = models.Value()
    #             value.date = row[i]
    #             value.indicator = indicator
    #             value.unitValue = unitValue
    #             value.typeValue = typeValue
    #             value.natureValue = natureValue
    #             value.frequency = frequency
    #             value.source = source
    #             value.dataSet = ""
    #             value.country = ""
    #             value.mass = ""
    #             value.value = row[i+1]
    #             try:
    #                 value.save()
    #             except:
    #                 pass
    #     return Response("done")
    pass


# class RetrieveUpdateDestroyPeer(viewsets.ModelViewSet):
#     queryset = models.Peer.objects.all()
#     serializer_class = serializers.PeerSerializer

class LoadDemandCru(APIView):
    pass
    # def get(self, request):
    #     BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    #     cru = BASE_DIR + '/data/CRU phosphate-fertilizersypply demand-2019-july-pivot-database.xlsx'
    #     df = pd.read_excel(cru, 'DATABASE - MARKET', header=1)
    #     for index, row in df.iterrows():
    #         demand = models.Demand()
    #         demand.name = row[0]
    #         demand.region = row[1]
    #         demand.subRegion = row[2]
    #         demand.country = row[3]
    #         demand.filterdemand = row[4]
    #         demand.year = row[5]
    #         demand.product = row[6]
    #         demand.unit = row[11]
    #         try:
    #             demand.pfmo = int(row[12])
    #         except:
    #             demand.pfmo = -99999
    #         demand.save()
    #     return(Response("done"))


class LoadMacroFacto(APIView):
    # def get(self, request):
    #     BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    #     cru = BASE_DIR + '/data/Bloomberg Macro_Data.xlsx'
    #     df = pd.read_excel(cru, 'Feuil1', header=1)
    #     columns = df.columns
    #     indicatorCategory = models.IndicatorCategory.objects.get(
    #         category='Macro Factors')
    #     unitValue = models.UnitValue.objects.get(unit='USD')
    #     typeValue = models.TypeValue.objects.get(name='AVG')
    #     natureValue = models.NatureValue.objects.get(name='Price')
    #     frequency = models.Frequency.objects.get(frequency='Daily')
    #     source = models.Source.objects.get(source='Bloomberg')
    #     for i in range(0, len(columns), 2):
    #         indicator = models.Indicator.objects.get(indicator=columns[i])
    #         for index, row in df.iterrows():
    #             value = models.Value()
    #             value.date = row[i]
    #             value.indicator = indicator
    #             value.unitValue = unitValue
    #             value.typeValue = typeValue
    #             value.natureValue = natureValue
    #             value.frequency = frequency
    #             value.source = source
    #             value.dataSet = ""
    #             value.country = ""
    #             value.mass = ""
    #             value.value = row[i+1]
    #             try:
    #                 value.save()
    #             except:
    #                 pass
    #     return Response("done")
    pass


class LoadDemandFertecon(APIView):
    pass

    # def get(self, request):
    #     BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    #     cru = BASE_DIR + '/data/Fertecon Demand 30 Oct 2019_histo-predict by region complet.xlsx'
    #     df = pd.read_excel(cru, 'Data', header=5)
    #     columns = df.columns.values
    #     for index, row in df.iterrows():
    #         for i in range(5, len(columns)):
    #             demand = models.Demand()
    #             demand.name = "Apparent Demand"
    #             demand.region = row[2]
    #             demand.subRegion = row[2]
    #             demand.country = row[3]
    #             demand.filterdemand = ""
    #             demand.product = row[1]
    #             demand.unit = row[4]
    #             demand.year = columns[i]
    #             demand.source = "Fertecon"
    #             try:
    #                 # print(''.join(row[i].split()))
    #                 # print(int(''.join(row[i].split())))
    #                 demand.pfmo = int(''.join(str(row[i]).split()))
    #                 # print(demand.region, demand.pfmo)
    #             except:
    #                 # demand.pfmo = -99999
    #                 pass
    #             demand.save()
    #     return(Response("done"))


class UpdateDemandFert(APIView):
    pass
    # def get(self, request):
    #     product = models.Demand.objects.filter(
    #         source='Fertecon').values('product').distinct()
    #     for x in product:
    #         pr = x["product"]
    #         year = models.Demand.objects.filter(
    #             source='Fertecon').values('year').distinct().order_by("year")
    #         pfmo = 0
    #         for y in year:
    #             all = models.Demand.objects.filter(country__in=['Southern Asia - Total ','Central Asia - Total ','Eastern Asia - Total ','Eurasia - Total ','Middle East - Total ','Southeast Asia - Total '],\
    #                 source='Fertecon',product=pr,year=int(y["year"]))
    #             pfmo = 0
    #             for x in all:
    #                 try:
    #                     pfmo = pfmo + int(x.pfmo)
    #                 except:
    #                     pfmo = pfmo + 0
    #             # print(pr,' ',y["year"], ' ',pfmo)
    #             demand = models.Demand()
    #             demand.name = "Apparent Demand"
    #             demand.region = "Asia Total"
    #             demand.subRegion = "Asia Total"
    #             demand.country = "Asia Total"
    #             demand.filterdemand = ""
    #             demand.product = pr
    #             demand.unit = "Thousand Tonnes"
    #             demand.year = y["year"]
    #             demand.source = "Fertecon"
    #             demand.pfmo = pfmo
    #             demand.save()
    #     return (Response("HTML"))


class LoadSupplyFertecon(APIView):
    pass
    # def get(self, request):
    #     BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    #     cru = BASE_DIR + '/data/Fertecon Supply 30 Oct 2019_histo-predict by region complet.xlsx'
    #     df = pd.read_excel(cru, 'Data', header=5)
    #     columns = df.columns.values
    #     for index, row in df.iterrows():
    #         for i in range(5, len(columns)):
    #             demand = models.Demand()
    #             demand.name = "Production"
    #             demand.region = row[2]
    #             demand.subRegion = row[2]
    #             demand.country = row[3]
    #             demand.filterdemand = ""
    #             demand.product = row[1]
    #             demand.unit = row[4]
    #             demand.year = columns[i]
    #             demand.source = "Fertecon"
    #             try:
    #                 # print(''.join(row[i].split()))
    #                 # print(int(''.join(row[i].split())))
    #                 demand.pfmo = int(''.join(str(row[i]).split()))
    #             except:
    #                 pass
    #             demand.save()
    #     return(Response("done"))


class UpdateSupplyFert(APIView):
    pass
    # def get(self, request):
    #     product = models.Demand.objects.filter(
    #         source='Fertecon',name='Production').values('product').distinct()
    #     for x in product:
    #         pr = x["product"]
    #         year = models.Demand.objects.filter(
    #             source='Fertecon',name='Production').values('year').distinct().order_by("year")
    #         pfmo = 0
    #         for y in year:
    #             all = models.Demand.objects.filter(country__in=['Southern Asia - Total ','Central Asia - Total ','Eastern Asia - Total ','Eurasia - Total ','Middle East - Total ','Southeast Asia - Total '],\
    #                 source='Fertecon',product=pr,year=int(y["year"]),name='Production')
    #             pfmo = 0
    #             for x in all:
    #                 try:
    #                     pfmo = pfmo + int(x.pfmo)
    #                 except:
    #                     pfmo = pfmo + 0
    #             # print(pr,' ',y["year"], ' ',pfmo)
    #             demand = models.Demand()
    #             demand.name = "Production"
    #             demand.region = "Asia Total"
    #             demand.subRegion = "Asia Total"
    #             demand.country = "Asia Total"
    #             demand.filterdemand = ""
    #             demand.product = pr
    #             demand.unit = "Thousand Tonnes"
    #             demand.year = y["year"]
    #             demand.source = "Fertecon"
    #             demand.pfmo = pfmo
    #             demand.save()
    #     return (Response("HTML"))


class LoadVolumeIFA(APIView):
    def get(self, request):
        # BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        # cru = BASE_DIR + \
        #     '/data/IFA_volume P2O5-quarter-3010_ historic (1).xlsx'
        # df = pd.read_excel(cru, 'TSP', header=2)
        # indicator = models.Indicator.objects.get(indicator='TSP')
        # unitValue = models.UnitValue.objects.get(unit='USD')
        # typeValue = models.TypeValue.objects.get(name='AVG')
        # natureValue = models.NatureValue.objects.get(name='Volume')
        # frequency = models.Frequency.objects.get(frequency='Quarter')
        # source = models.Source.objects.get(source='IFA')
        # for index, row in df.iterrows():
        #     if (row[3] == 'Q1'):
        #         date = str(int(row[2])) + '-01-01'
        #     elif (row[3] == 'Q2'):
        #         date = str(int(row[2])) + '-04-01'
        #     elif (row[3] == 'Q3'):
        #         date = str(int(row[2])) + '-07-01'
        #     elif (row[3] == 'Q4'):
        #         date = str(int(row[2])) + '-10-01'
        #     value = models.Value()
        #     value.date = date
        #     value.indicator = indicator
        #     value.unitValue = unitValue
        #     value.typeValue = typeValue
        #     value.natureValue = natureValue
        #     value.frequency = frequency
        #     value.source = source
        #     value.dataSet = ""
        #     value.country = row[1]
        #     value.mass = ""
        #     try:
        #         if (row[3] != 'A'):
        #             value.value = row[4]
        #             if (math.isnan(value.value) == False):
        #                 # print(value.date, ' ', value.value)
        #                 value.save()
        #     except:
        #         print("eroro")
        #         pass
        # return (Response("Done"))
        pass


class ValuePostViewSet(viewsets.ViewSet):

    queryset = models.Value.objects.all(). prefetch_related(
        'unitValue', 'typeValue', 'frequency', 'indicator',
        'source', 'natureValue')
    serializer_class = serializers.ValueSerializer

    def list(self, request):
        # indic = request.data.get('indicator', None)
        # request.data.get('action', None)
        indic = request.data.get('indicator', None)
        # cntry = self.request.query_params.get('country', None)
        # dset = self.request.query_params.get('dataset', None)
        # frange = self.request.query_params.get('range', None)
        # fsource = self.request.query_params.get('source', None)
        queryset = models.Value.objects.prefetch_related(
            'unitValue', 'typeValue', 'frequency', 'indicator',
            'source', 'natureValue').order_by('date')
        indicator = models.Indicator.objects.filter(
            indicator__in=indic.split(','))
        queryset = queryset.filter(indicator__in=indicator)
        # if (cntry is not None):
        #     queryset = queryset.filter(country__in=cntry.split(','))
        # if (dset is not None):
        #     queryset = queryset.filter(dataSet__in=dset.split(','))
        # if (fsource is not None):
        #     source = models.Source.objects.filter(
        #         source__in=fsource.split(','))
        #     queryset = queryset.filter(source__in=source)
        queryset = queryset.order_by('date')
        # if (frange is not None):
        #     queryset = queryset.order_by('-date')[:int(frange)]
        result = {}
        serializer = serializers.ValueSerializer(queryset, many=True)
        for x in serializer.data:
            key = x.pop('indicator')
            if key not in result:
                result[key] = []
            result[key].append(x)
        return Response(result)


class LoadForcastCru(APIView):
    def get(self, request):
        # BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        # cru = BASE_DIR + '/data/fertilizer-week-short-term-forecast-prices-october-2019.xlsx'
        # df = pd.read_excel(cru, 'Sheet1', header=1)
        # columns = df.columns.values
        # indicatorCategory = models.IndicatorCategory.objects.get(
        #     category='Raw Material')
        # typeValue = models.TypeValue.objects.get(name='AVG')
        # natureValue = models.NatureValue.objects.get(name='Price')
        # frequency = models.Frequency.objects.get(frequency='Monthly')
        # source = models.Source.objects.get(source='CRU')
        # for index, row in df.iterrows():
        #     pass
        #     # try:
        #     indicator = models.Indicator.objects.get(indicator=row[1])
        #     # except:
        #     #     indicator = models.Indicator()
        #     #     indicator.indicator = row[1]
        #     #     indicator.description = row[1]
        #     #     indicator.indicatorCategory = indicatorCategory
        #     #     indicator.save()
        #     unitValue = models.UnitValue.objects.get(unit='USD')
        #     for i in range(7, len(columns)):
        #         value = models.Value()
        #         value.date = columns[i]
        #         value.indicator = indicator
        #         value.unitValue = unitValue
        #         value.typeValue = typeValue
        #         value.natureValue = natureValue
        #         value.frequency = frequency
        #         value.source = source
        #         value.dataSet = row[3]
        #         value.country = row[2]
        #         ms = row[5].split('/')
        #         value.mass = ms[1]
        #         value.value = row[i]
        #         print(value.mass)
        #         value.save()
        return Response("done")


class ValueCSVViewSet(viewsets.ModelViewSet):
    # queryset = models.Value.objects.all(). prefetch_related(
    #     'unitValue', 'typeValue', 'frequency', 'indicator',
    #     'source', 'natureValue')
    # print("test")
    queryset = models.Value.objects.all()
    serializer_class = serializers.ValueCSVSerializer

    def list(self, request):
        # queryset = models.Value.objects.all().prefetch_related(
        #     'unitValue', 'typeValue', 'frequency', 'indicator',
        #     'source', 'natureValue')
        queryset = models.Value.objects.all()
        serializer = serializers.ValueCSVSerializer(queryset, many=True)
        # response = HttpResponse(content_type='text/csv')
        # response['Content-Disposition'] = 'attachment; filename="somefilename.csv"'
        # writer = csv.writer(response)
        # # writer.writerow(['First row', 'Foo', 'Bar', 'Baz'])
        # for row in serializer.data:
        #     writer.writerow([row['date'], row['value']])
        #     # print(row)
        # renderer_classes = (r.CSVRenderer, ) + \
        #     tuple(api_settings.DEFAULT_RENDERER_CLASSES)
        return (render_to_csv_response(queryset))


class DemandCSVViewSet(viewsets.ModelViewSet):
    queryset = models.Demand.objects.all()

    def list(self, request):
        queryset = models.Demand.objects.all()
        serializer = serializers.DemandCSVSerializer(queryset, many=True)
        # renderer_classes = (r.CSVRenderer, ) + \
        #     tuple(api_settings.DEFAULT_RENDERER_CLASSES)
        return (render_to_csv_response(queryset))


class SourceCSVViewSet(viewsets.ModelViewSet):
    queryset = models.Source.objects.all()

    def list(self, request):
        queryset = models.Source.objects.all()
        serializer = serializers.SourceCSVSerializer(queryset, many=True)
        return (render_to_csv_response(queryset))


class FrequencyCSVViewSet(viewsets.ModelViewSet):
    queryset = models.Frequency.objects.all()

    def list(self, request):
        queryset = models.Frequency.objects.all()
        serializer = serializers.FrequencyCSVSerializer(queryset, many=True)
        return (render_to_csv_response(queryset))


class IndicatorCSVViewSet(viewsets.ModelViewSet):
    queryset = models.Indicator.objects.all()

    def list(self, request):
        queryset = models.Indicator.objects.all()
        serializer = serializers.IndicatorCSVSerializer(queryset, many=True)
        return (render_to_csv_response(queryset))


class IndicatorCategoryCSVViewSet(viewsets.ModelViewSet):
    queryset = models.IndicatorCategory.objects.all()

    def list(self, request):
        queryset = models.IndicatorCategory.objects.all()
        serializer = serializers.IndicatorCSVSerializer(queryset, many=True)
        return (render_to_csv_response(queryset))


class NatureValueCSVViewSet(viewsets.ModelViewSet):
    queryset = models.NatureValue.objects.all()

    def list(self, request):
        queryset = models.NatureValue.objects.all()
        serializer = serializers.NatureValueCSVSerializer(queryset, many=True)
        return (render_to_csv_response(queryset))


class TypeValueCSVViewSet(viewsets.ModelViewSet):
    queryset = models.TypeValue.objects.all()

    def list(self, request):
        queryset = models.TypeValue.objects.all()
        serializer = serializers.TypeValueCSVSerializer(queryset, many=True)
        return (render_to_csv_response(queryset))


class UnitValueCSVViewSet(viewsets.ModelViewSet):
    queryset = models.UnitValue.objects.all()

    def list(self, request):
        queryset = models.UnitValue.objects.all()
        serializer = serializers.UnitValueCSVSerializer(queryset, many=True)
        return (render_to_csv_response(queryset))
