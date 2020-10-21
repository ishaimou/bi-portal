from django.db import models


class Thematic_App(models.Model):
    name = models.CharField('Thematique', max_length=100)

    class Meta:
        verbose_name = "Thematique"
        verbose_name_plural = "Thematiques"

    def __str__(self):
        return "{}".format(self.name)


class App_Interne(models.Model):
    name = models.CharField(
        'Application', max_length=100, null=False, unique=True)
    website = models.CharField(
        'Site Web', max_length=100, null=False, unique=True)
    thematic = models.ManyToManyField(Thematic_App)
    description = models.CharField(
        'About this app', max_length=250, null=True, blank=True)
    logo = models.FileField(
        'Application Logo', upload_to='images/', null=False)
    image = models.FileField(
        'Application Image', upload_to='images/', null=True, blank=True)

    class Meta:
        verbose_name = "Application"
        verbose_name_plural = "Applications"

    def __str__(self):
        return "{}".format(self.name)


class Country(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    code = models.CharField(max_length=2, null=False, unique=True)

    class Meta:
        verbose_name = 'Country'
        verbose_name_plural = 'Countries'
        ordering = ['name']

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)

    def __str__(self):
        return self.name


class Client(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    site = models.URLField(blank=True)
    brandlogo = models.FileField(
        'Application Logo', upload_to='images/', null=True)
    country = models.ForeignKey(
        Country, on_delete=models.CASCADE, related_name='clients')
    products = models.ManyToManyField(Product)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Peer(models.Model):
    name = models.CharField(max_length=200, null=False, unique=True)
    site = models.URLField(blank=True)
    brandlogo = models.FileField(
        'Application Logo', upload_to='images/', null=True)
    country = models.ForeignKey(
        Country, on_delete=models.CASCADE, related_name='peers')
    products = models.ManyToManyField(Product)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Source_Externe(models.Model):
    name = models.CharField(
        'Application', max_length=100, null=False, unique=True)
    website = models.CharField(
        'Site Web', max_length=100, null=False, unique=True)
    thematic = models.ManyToManyField(Thematic_App)
    logo = models.FileField(
        'Application Logo', upload_to='images/sourcesext/', null=False)

    atomic = False

    class Meta:
        verbose_name = "Source Externe"
        verbose_name_plural = "Source Externes"

    def __str__(self):
        return "{}".format(self.name)


# Dashboard Models


class IndicatorCategory(models.Model):
    category = models.CharField(
        'Category', max_length=50, null=False, unique=True)

    class Meta:
        verbose_name = "Indicator Category"
        verbose_name_plural = "Indicator Categories"

    def __str__(self):
        return "{}".format(self.category)


class Frequency(models.Model):
    frequency = models.CharField(
        'Frequency', max_length=50, null=False, unique=True)

    class Meta:
        verbose_name = "Frequency"
        verbose_name_plural = "Frequencies"

    def __str__(self):
        return "{}".format(self.frequency)


class Source(models.Model):
    source = models.CharField(
        'Source', max_length=50, null=False, unique=True)

    class Meta:
        verbose_name = "Source"
        verbose_name_plural = "Sources"

    def __str__(self):
        return "{}".format(self.source)


class Indicator(models.Model):
    indicator = models.CharField(
        'Indicator', max_length=50, null=False, unique=True)
    description = models.TextField('Description', null=True, blank=True)
    indicatorCategory = models.ForeignKey(
        IndicatorCategory, on_delete=models.CASCADE, related_name='ind_cat')

    class Meta:
        verbose_name = "Indicator"
        verbose_name_plural = "Indicators"

    def __str__(self):
        return "{}".format(self.indicator)


class UnitValue(models.Model):
    unit = models.CharField(
        'Unit', max_length=50, null=False, unique=True)

    class Meta:
        verbose_name = "Unit Value"
        verbose_name_plural = "Unit Value"

    def __str__(self):
        return "{}".format(self.unit)


class TypeValue(models.Model):
    name = models.CharField(
        'Type', max_length=50, null=False, unique=True)

    class Meta:
        verbose_name = "Type Value"
        verbose_name_plural = "Type Value"

    def __str__(self):
        return "{}".format(self.name)


class NatureValue(models.Model):
    # commit
    name = models.CharField(
        'Nature', max_length=50, null=False, unique=True)

    class Meta:
        verbose_name = "Nature Value"
        verbose_name_plural = "Nature Value"

    def __str__(self):
        return "{}".format(self.name)


class Value(models.Model):
    value = models.DecimalField(
        'Value', max_digits=8, decimal_places=2, null=True, blank=True)
    date = models.DateField('Date')
    unitValue = models.ForeignKey(
        UnitValue, on_delete=models.CASCADE, related_name='unit_value')
    typeValue = models.ForeignKey(
        TypeValue, on_delete=models.CASCADE, related_name='type_value')
    natureValue = models.ForeignKey(
        NatureValue, on_delete=models.CASCADE, related_name='nature_value')
    frequency = models.ForeignKey(
        Frequency, on_delete=models.CASCADE, related_name='valeue_frequency')
    indicator = models.ForeignKey(
        Indicator, on_delete=models.CASCADE, related_name='value_indicator')
    source = models.ForeignKey(
        Source, on_delete=models.CASCADE, related_name='value_source')
    min = models.DecimalField(
        'Min', max_digits=8, decimal_places=2, null=True, blank=True)
    max = models.DecimalField(
        'Max', max_digits=8, decimal_places=2, null=True, blank=True)
    dataSet = models.CharField(
        'Data Set', max_length=50, null=True, blank=True)
    country = models.CharField(
        'Country', max_length=50, null=True, blank=True)
    mass = models.CharField(
        'Mass', max_length=50, null=True, blank=True)
    forcast = models.BooleanField('Forcast', null=True, blank=True)

    class Meta:
        verbose_name = "Value"
        verbose_name_plural = "Values"

    def __str__(self):
        return "{}".format(self.indicator)


class Demand(models.Model):
    name = models.CharField('Name', max_length=50)
    region = models.CharField('Region', max_length=100, null=True, blank=True)
    subRegion = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    filterdemand = models.CharField(max_length=100, null=True, blank=True)
    year = models.IntegerField(null=True, blank=True)
    product = models.CharField(max_length=100, null=True, blank=True)
    unit = models.CharField(max_length=100, null=True, blank=True)
    pfmo = models.IntegerField(null=True, blank=True)
    source = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        verbose_name = "Demand"
        verbose_name_plural = "Demands"
