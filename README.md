# BI_Portal

BI_Portal بوابة ذكاء الأعمال

# Value

Only indicator filter is mandatory

ex link :

http://52.204.94.159:8000/api/values/?indicator=Ammonia&country=Morocco%20Spot/Contract&dataset=Bulk%20CFR&range=2

http://52.204.94.159:8000/api/values/?

    - indicator
    - country
    - dataset
    - range (how many last rows u need)
    - source (ex : CRU)

# Volume

filter by indicator

ex link - http://52.204.94.159:8000/api/volumes/?indicator=MAP,DAP

# Demand and supply

all filters are manadatory for the moment

ex link :

- http://52.204.94.159:8000/api/demand/?region=Asia%20Total,Middle%20East%20Total&product=DAP&source=CRU&type=Production

http://52.204.94.159:8000/api/demand/?

- region

  - World Total
  - Europe CIS Total
  - Africa Total
  - North America Total
  - Central South America Total
  - Asia Total
  - Oceania Total

- product

  - MAP
  - DAP
  - MGA
  - SSP
  - TSP

- source

  - CRU
  - Fertecon

- type
  - Production
  - Apparent Demand

#Values Forcast

http://52.204.94.159:8000/api/forcast/?indicator=Ammonia&country=Baltic%20Sea&dataset=Bulk%20FOB%20spot

http://52.204.94.159:8000/api/forcast/

- indicator
- country
- dataset
