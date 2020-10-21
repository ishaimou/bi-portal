from rest_framework import serializers
from . import models


class ClientSerializer(serializers.ModelSerializer):
    country = serializers.SerializerMethodField()
    products = serializers.StringRelatedField(many=True, read_only=True)

    def get_country(self, obj):
        if obj.country:
            return obj.country.code
        else:
            return None

    class Meta:
        model = models.Client
        fields = (
            'name',
            'site',
            'brandlogo',
            'country',
            'products'
        )


class PeerSerializer(serializers.ModelSerializer):
    country = serializers.SerializerMethodField()
    products = serializers.StringRelatedField(many=True, read_only=True)

    def get_country(self, obj):
        if obj.country:
            return obj.country.code
        else:
            return None

    class Meta:
        model = models.Peer
        fields = (
            'id',
            'name',
            'site',
            'brandlogo',
            'country',
            'products'
        )


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Country
        fields = (
            'id',
            'name',
            'code'
        )


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = (
            'id',
            'name'
        )


class App_InterneSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.App_Interne
        fields = '__all__'


class Thematic_AppSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Thematic_App
        fields = '__all__'


class Source_ExterneSerializer(serializers.ModelSerializer):
    thematic = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = models.Source_Externe
        fields = '__all__'


class ValueSerializer(serializers.ModelSerializer):
    # methode fields
    unitValue = serializers.SerializerMethodField()
    typeValue = serializers.SerializerMethodField()
    frequency = serializers.SerializerMethodField()
    indicator = serializers.SerializerMethodField()
    # description = serializers.SerializerMethodField()
    source = serializers.SerializerMethodField()
    natureValue = serializers.SerializerMethodField()

    def get_natureValue(self, obj):
        if obj.natureValue:
            return obj.natureValue.name
        else:
            return None

    def get_source(self, obj):
        if obj.source:
            return obj.source.source
        else:
            return None

    def get_indicator(self, obj):
        if obj.indicator:
            return obj.indicator.indicator
        else:
            return None

    # def get_description(self, obj):
    #     if obj.indicator:
    #         return obj.indicator.description
    #     else:
    #         return None

    def get_frequency(self, obj):
        if obj.frequency:
            return obj.frequency.frequency
        else:
            return None

    def get_typeValue(self, obj):
        if obj.typeValue:
            return obj.typeValue.name
        else:
            return None

    def get_unitValue(self, obj):
        if obj.unitValue:
            return obj.unitValue.unit
        else:
            return None

    class Meta:
        model = models.Value
        fields = ('date', 'value', 'natureValue', 'source',
                  'indicator', 'frequency', 'typeValue', 'unitValue')


class VolumeSerializer(serializers.ModelSerializer):
    indicator = serializers.SerializerMethodField()

    def get_indicator(self, obj):
        if obj.indicator:
            return obj.indicator.indicator
        else:
            return None

    class Meta:
        model = models.Value
        fields = ('date', 'value', 'indicator')


class IndicatorCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.IndicatorCategory
        fields = '__all__'


class IndicatorSerializer(serializers.ModelSerializer):
    indicatorCategory = serializers.StringRelatedField()

    class Meta:
        model = models.Indicator
        fields = '__all__'


class NatureValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.NatureValue
        fields = '__all__'


class DemandSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Demand
        fields = ('name', 'region', 'country',
                  'year', 'unit', 'pfmo', 'source', 'product')


class DemandCSVSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Demand
        fields = '__all__'


class ValueCSVSerializer(serializers.ModelSerializer):
    # methode fields
    # unitValue = serializers.SerializerMethodField()
    # typeValue = serializers.SerializerMethodField()
    # frequency = serializers.SerializerMethodField()
    # indicator = serializers.SerializerMethodField()
    # description = serializers.SerializerMethodField()
    # source = serializers.SerializerMethodField()
    # natureValue = serializers.SerializerMethodField()

    # def get_natureValue(self, obj):
    #     if obj.natureValue:
    #         return obj.natureValue.name
    #     else:
    #         return None

    # def get_source(self, obj):
    #     if obj.source:
    #         return obj.source.source
    #     else:
    #         return None

    # def get_indicator(self, obj):
    #     if obj.indicator:
    #         return obj.indicator.indicator
    #     else:
    #         return None

    # def get_description(self, obj):
    #     if obj.indicator:
    #         return obj.indicator.description
    #     else:
    #         return None

    # def get_frequency(self, obj):
    #     if obj.frequency:
    #         return obj.frequency.frequency
    #     else:
    #         return None

    # def get_typeValue(self, obj):
    #     if obj.typeValue:
    #         return obj.typeValue.name
    #     else:
    #         return None

    # def get_unitValue(self, obj):
    #     if obj.unitValue:
    #         return obj.unitValue.unit
    #     else:
    #         return None

    class Meta:
        model = models.Value
        fields = '__all__'
        # fields = ('date', 'value', 'natureValue', 'source',
        #           'indicator', 'frequency', 'description',
        #           'typeValue', 'unitValue', 'max', 'min', 'country',
        #           'dataSet', 'mass', 'forcast')


class SourceCSVSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Source
        fields = '__all__'


class FrequencyCSVSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Frequency
        fields = '__all__'


class IndicatorCSVSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Indicator
        fields = '__all__'


class IndicatorCategoryCSVSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.IndicatorCategory
        fields = '__all__'


class NatureValueCSVSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.NatureValue
        fields = '__all__'


class TypeValueCSVSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TypeValue
        fields = '__all__'


class UnitValueCSVSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UnitValue
        fields = '__all__'
