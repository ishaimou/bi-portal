const chartOptions = (seriesOptions, name, multiple = 1, unit) => {
  return {
    chart: {
      zoomType: "xy",
      height: "35%"
    },
    rangeSelector: {
      selected: 5,
      inputDateFormat: "%Y-%m-%d",
      buttons: [
        {
          type: "month",
          count: 3,
          text: "3m"
        },
        {
          type: "year",
          count: 1,
          text: "1y"
        },
        {
          type: "year",
          count: 5,
          text: "5y"
        },
        {
          type: "ytd",
          text: "YTD"
        },
        {
          type: "all",
          text: "All"
        }
      ]
    },
    legend: {
      enabled: multiple > 1 ? true : false,
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      // floating: true,
      // itemDistance: "20px",
      itemMarginBottom: 0,
      itemMarginTop: 0,
      margin: 0,
      padding: 8,
      itemStyle: {
        // fontWeight: 400,
        fontSize: "9px",
        font: "Trebuchet MS, Verdana, sans-serif"
      },
      symbolHeight: 6,
      symbolWidth: 6,
      symbolRadius: 3
    },
    yAxis: {
      title: {
        text: unit
      }
    },
    navigator: {
      enabled: false,
      margin: 5
    },
    boost: {
      useGPUTranslations: true
    },
    title: {
      text: ""
    },
    plotOptions: {
      series: {
        showInNavigator: false,
        connectNulls: true
      }
    },
    tooltip: {
      pointFormatter: function() {
        return (
          '<span style="color:' +
          this.color +
          '">' +
          this.series.name +
          ": </span><b>" +
          "<b>" +
          +this.y.toFixed(2) +
          "</b> " +
          this.series.userOptions.unit +
          "</b>"
        );
      },
      style: {
        // width: "200px"
      },
      valueDecimals: 2,
      shared: true,
      split: true
    },
    series: seriesOptions,
    exporting: {
      enabled: false,
      buttons: {
        contextButton: {
          menuItems: ["viewFullscreen"]
        }
      }
    },
    navigation: {
      buttonOptions: {
        align: "right"
      }
    },
    scrollbar: {
      barBackgroundColor: "gray",
      barBorderRadius: 7,
      barBorderWidth: 0,
      buttonBackgroundColor: "gray",
      buttonBorderWidth: 0,
      buttonArrowColor: "yellow",
      buttonBorderRadius: 7,
      rifleColor: "yellow",
      trackBackgroundColor: "white",
      trackBorderWidth: 1,
      trackBorderColor: "silver",
      trackBorderRadius: 7
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            chart: {
              height: "300px"
            },
            subtitle: {
              text: null
            },
            navigator: {
              enabled: false
            },
            legend: {
              enabled: multiple > 1 ? true : false,
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom"
            }
          }
        },
        {
          condition: {
            minWidth: 950
          },
          chartOptions: {
            chart: {
              height: "56%"
            },
            subtitle: {
              text: name
            },
            navigator: {
              enabled: true
            },
            legend: {
              enabled: true,
              layout: "vertical",
              align: "right",
              verticalAlign: "middle",
              itemStyle: {
                fontSize: "16px"
              },
              symbolHeight: 16,
              symbolWidth: 16,
              symbolRadius: 8
            },
            plotOptions: {
              series: {
                showInNavigator: true
              }
            }
          }
        }
      ]
    }
  };
};

const P2O5chartOptions = (seriesOptions, name, multiple = 1) => {
  return {
    chart: {
      zoomType: "x",
      reflow: true,
      height: "35%"
    },
    rangeSelector: {
      selected: 5,
      inputDateFormat: "%Y-%m-%d",
      buttons: [
        {
          type: "month",
          count: 3,
          text: "3m"
        },
        {
          type: "year",
          count: 1,
          text: "1y"
        },
        {
          type: "year",
          count: 5,
          text: "5y"
        },
        {
          type: "ytd",
          text: "YTD"
        },
        {
          type: "all",
          text: "All"
        }
      ]
    },
    legend: {
      enabled: multiple > 1 ? true : false,
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      itemDistance: 0,
      itemMarginBottom: 0,
      itemMarginTop: 0,
      margin: 0,
      padding: 0,
      itemStyle: {
        fontSize: "9px",
        font: "Trebuchet MS, Verdana, sans-serif"
      },
      symbolHeight: 6,
      symbolWidth: 6,
      symbolRadius: 3
    },
    xAxis: {
      type: "datetime"
    },
    yAxis: [
      {
        labels: {
          align: "right",
          x: -3
        },
        title: {
          text: "Price"
        },
        height: "60%",
        lineWidth: 2,
        resize: {
          enabled: true
        }
      },
      {
        labels: {
          align: "right",
          x: -3
        },
        title: {
          text: "Volume"
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2
      }
    ],
    navigator: {
      enabled: false,
      margin: 5
    },
    scrollbar: {
      barBackgroundColor: "gray",
      barBorderRadius: 7,
      barBorderWidth: 0,
      buttonBackgroundColor: "gray",
      buttonBorderWidth: 0,
      buttonArrowColor: "yellow",
      buttonBorderRadius: 7,
      rifleColor: "yellow",
      trackBackgroundColor: "white",
      trackBorderWidth: 1,
      trackBorderColor: "silver",
      trackBorderRadius: 7
    },
    boost: {
      useGPUTranslations: true
    },
    title: {
      text: ""
    },
    plotOptions: {
      series: {
        // pointWidth: 10,
        pointPadding: 0,
        groupPadding: 0,
        showInNavigator: false,
        connectNulls: true
      }
    },
    tooltip: {
      // pointFormat:
      // '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
      useHTML: true,
      pointFormatter: function() {
        return (
          '<span style="color:' +
          this.color +
          '">' +
          this.series.name +
          ": </span>" +
          "<b>" +
          +this.y.toFixed(2) +
          "</b> " +
          this.series.userOptions.unit +
          "</br>"
        );
      },
      style: {
        // width: "200px"
      },
      valueDecimals: 2,
      valueSuffix: "",
      shared: true,
      // crosshairs: true,
      split: false
    },
    series: seriesOptions,
    exporting: {
      enabled: false,
      buttons: {
        contextButton: {
          menuItems: ["viewFullscreen"]
        }
      }
    },
    navigation: {
      buttonOptions: {
        align: "right"
      }
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            chart: {
              height: 300
            },
            subtitle: {
              text: null
            },
            navigator: {
              enabled: false
            },
            legend: {
              enabled: multiple > 1 ? true : false,
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom"
            }
          }
        },
        {
          condition: {
            minWidth: 950
          },
          chartOptions: {
            chart: {
              height: "56%"
            },
            subtitle: {
              text: name
            },
            navigator: {
              enabled: true
            },
            legend: {
              enabled: true,
              layout: "vertical",
              align: "right",
              verticalAlign: "middle",
              itemStyle: {
                fontSize: "16px"
              },
              symbolHeight: 16,
              symbolWidth: 16,
              symbolRadius: 8
            },
            plotOptions: {
              series: {
                showInNavigator: true
              }
            }
          }
        }
      ]
    }
  };
};

const RawchartOptions = (seriesOptions, unit) => {
  return {
    chart: {
      zoomType: "x",
      height: "35%"
    },
    rangeSelector: {
      selected: 5,
      inputDateFormat: "%Y-%m-%d",
      buttons: [
        {
          type: "month",
          count: 3,
          text: "3m"
        },
        {
          type: "year",
          count: 1,
          text: "1y"
        },
        {
          type: "year",
          count: 5,
          text: "5y"
        },
        {
          type: "ytd",
          text: "YTD"
        },
        {
          type: "all",
          text: "All"
        }
      ]
    },
    legend: {
      enabled: true,
      layout: "vertcal",
      align: "right",
      verticalAlign: "middle",
      itemMarginBottom: 0,
      itemMarginTop: 0,
      margin: 0,
      padding: 8,
      itemStyle: {
        fontSize: "9px",
        font: "Trebuchet MS, Verdana, sans-serif"
      },
      symbolHeight: 6,
      symbolWidth: 6,
      symbolRadius: 3
    },
    xAxis: {
      plotBands: [
        {
          from: 0,
          to: Date.UTC(2019, 10, 1),
          color: "rgba(204,204,204,0.2)",
          label: {
            text: "Historical",
            style: { fontSize: "12px" }
          }
        },
        {
          from: Date.UTC(2019, 10, 1),
          to: Date.UTC(2021, 0, 1),
          color: "rgba(0,102,204,0.2)",
          label: {
            text: "Predicted",
            style: { fontSize: "12px" }
          }
        }
      ],
      plotLines: [
        {
          color: "rgba(0,204,102,1)", // Color value
          dashStyle: "longdashdot", // Style of the plot line. Default to solid
          value: Date.UTC(2019, 10, 1), // Value of where the line will appear
          width: 2 // Width of the line
        }
      ]
    },
    yAxis: {
      title: {
        text: unit
      }
    },
    navigator: {
      enabled: false,
      margin: 5
    },
    scrollbar: {
      enabled: true,
      barBackgroundColor: "gray",
      barBorderRadius: 7,
      barBorderWidth: 0,
      buttonBackgroundColor: "gray",
      buttonBorderWidth: 0,
      buttonArrowColor: "yellow",
      buttonBorderRadius: 7,
      rifleColor: "yellow",
      trackBackgroundColor: "white",
      trackBorderWidth: 1,
      trackBorderColor: "silver",
      trackBorderRadius: 7
    },
    boost: {
      useGPUTranslations: true
    },
    title: {
      text: ""
    },
    plotOptions: {
      series: {
        showInNavigator: false,
        connectNulls: true
      }
    },
    tooltip: {
      pointFormatter: function() {
        return (
          '<span style="color:' +
          this.color +
          '">' +
          this.series.name +
          ": </span><b>" +
          "<b>" +
          +this.y.toFixed(2) +
          "</b> " +
          this.series.userOptions.unit +
          "</b>"
        );
      },
      style: {
        // width: "200px"
      },
      valueDecimals: 2,
      shared: true,
      split: true
    },
    series: seriesOptions,
    exporting: {
      enabled: false,
      buttons: {
        contextButton: {
          menuItems: ["viewFullscreen"]
        }
      }
    },
    navigation: {
      buttonOptions: {
        align: "right"
      }
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            chart: {
              height: 300
            },
            subtitle: {
              text: null
            },
            navigator: {
              enabled: false
            },
            legend: {
              enabled: true,
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom"
            }
          }
        },
        {
          condition: {
            minWidth: 950
          },
          chartOptions: {
            chart: {
              height: "56%"
            },
            subtitle: {
              text: "Raw Materials"
            },
            navigator: {
              enabled: true
            },
            legend: {
              enabled: true,
              layout: "vertical",
              align: "right",
              verticalAlign: "middle",
              itemStyle: {
                fontSize: "16px"
              },
              symbolHeight: 16,
              symbolWidth: 16,
              symbolRadius: 8
            },
            plotOptions: {
              series: {
                showInNavigator: true
              }
            }
          }
        }
      ]
    }
  };
};

const demandSupplyChartOptions = seriesOptions => ({
  chart: {
    zoomType: "x"
  },
  rangeSelector: {
    selected: 5,
    inputDateFormat: "%Y-%m-%d",
    buttons: [
      {
        type: "year",
        count: 5,
        text: "5y"
      },
      {
        type: "year",
        count: 10,
        text: "10y"
      },
      {
        type: "all",
        text: "All"
      }
    ]
  },
  legend: {
    enabled: true,
    layout: "vertical",
    align: "left",
    verticalAlign: "middle"
  },
  yAxis: {
    title: {
      text: "Thousand Tonnes"
    }
  },
  xAxis: {
    plotBands: [
      {
        from: 0,
        to: Date.UTC(2019, 0, 1),
        color: "rgba(204,204,204,0.2)",
        label: {
          text: "Historical"
        }
      },
      {
        from: Date.UTC(2019, 0, 1),
        to: Date.UTC(2030, 0, 1),
        color: "rgba(0,102,204,0.2)",
        label: {
          text: "Predicted"
        }
      }
    ],
    plotLines: [
      {
        color: "rgba(0,204,102,1)", // Color value
        dashStyle: "longdashdot", // Style of the plot line. Default to solid
        value: Date.UTC(2019, 0, 1), // Value of where the line will appear
        width: 2 // Width of the line
      }
    ]
  },
  title: {
    text: ""
  },
  plotOptions: {
    series: {
      showInNavigator: true,
      connectNulls: true
    }
  },
  tooltip: {
    pointFormat:
      '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
    style: {
      // width: "200px"
    },
    valueDecimals: 0,
    valueSuffix: " kt",
    shared: true,
    split: true
  },
  series: seriesOptions,
  exporting: {
    enabled: true
  },
  navigation: {
    buttonOptions: {
      align: "left"
    }
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          chart: {
            height: 300
          },
          subtitle: {
            text: null
          },
          navigator: {
            enabled: false
          },
          legend: {
            enabled: true,
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom"
          }
        }
      }
    ]
  }
});

module.exports = {
  chartOptions,
  demandSupplyChartOptions,
  P2O5chartOptions,
  RawchartOptions
};
