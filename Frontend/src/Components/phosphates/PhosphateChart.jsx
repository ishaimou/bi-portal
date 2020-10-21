import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import equal from "fast-deep-equal";
import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import { P2O5chartOptions } from "../../variables/charts.jsx";
import { api } from "../../config";

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/data")(Highcharts);
require("highcharts/modules/boost")(Highcharts);
require("highcharts/modules/datagrouping")(Highcharts);

class PhosphateChart extends Component {
  constructor(props) {
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    this.afterChartCreated = this.afterChartCreated.bind(this);
    this.state = {
      seriesOptions: []
    };
    this.chart = {};
  }

  getColor(product) {
    switch (product) {
      case "MAP":
        return "#00918e";
      case "DAP":
        return "#537ec5";
      case "TSP":
        return "#bd574e";
      case "SSP":
        return "#6f9a8d";
      case "Phosphoric Acid":
        return "#745c97";
      default:
        return "#7CB5EC";
    }
  }

  onFetchData() {
    let seriesCounter = 0;
    let seriesOptions = [];
    let listVolume = [];
    let products = this.props.products;
    let indicators = this.props.indicators;
    let Filter = () => {
      let filter;
      let id = [];
      let dataset = [];
      let country = [];
      id = products.map(product => product.id);
      dataset = products.map(product => {
        return indicators[
          indicators.findIndex(indicator => {
            return indicator.id === product.id;
          })
        ].dataset;
      });
      country = products.map(product => {
        return indicators[
          indicators.findIndex(indicator => {
            return indicator.id === product.id;
          })
        ].country;
      });
      filter = `${id.toString()}&dataset=${dataset.toString()}&country=${country.toString()}`;
      return filter;
    };

    Highcharts.getJSON(
      `${api}/values/?product=${Filter()}`,
      function(data) {
        products.forEach((product, i) => {
          let dataLength = data[product.id].length;
          let j = 0;
          let price = [];
          for (j; j < dataLength; j += 1) {
            price.push([
              Date.parse(data[product.id][j].date), // the date
              parseFloat(data[product.id][j].value) // the price
            ]);
          }
          seriesOptions.push({
            color: this.getColor(products[i].name),
            type: "line",
            id: products[i].name,
            yAxis: 0,
            name: products[i].name,
            data: price,
            unit: data[product.id][0].unitValue,
            volume: false
            // pointStart: Date.UTC(2009, 8, 3)
          });
          seriesCounter += 1;
        });
        if (seriesCounter === products.length) {
          this.setState({
            seriesOptions
          });
          this.chart.hideLoading();
        }
      }.bind(this)
    );

    listVolume = products.map(product => {
      if (product.volume) {
        return product.id;
      } else {
        return null;
      }
    });
    listVolume = listVolume.filter(item => item);
    let filterVolume = listVolume.toString();
    if (listVolume.length) {
      Highcharts.getJSON(
        `${api}/volumes/?indicator=${filterVolume}`,
        function(dataVolume) {
          let counter = 0;
          listVolume.forEach(product => {
            let dataLength = dataVolume[product].length;
            let j = 0;
            let volume = [];
            for (j; j < dataLength; j += 1) {
              if (
                Date.parse(dataVolume[product][j].date) >=
                Date.parse("2009-09-03")
              ) {
                volume.push([
                  Date.parse(dataVolume[product][j].date), // the date
                  parseFloat(dataVolume[product][j].value) // the volume
                ]);
              }
            }
            seriesOptions.push({
              color: this.getColor(product),
              type: "column",
              name: product,
              data: volume,
              linkedTo: product,
              volume: true,
              unit: "kt",
              // pointStart: Date.UTC(2009, 8, 3),
              yAxis: 1
              // dataGrouping: {
              //   enabled: true,
              //   units: [["week", [1]], ["month", [1, 3, 6]]]
              // }
            });
            counter += 1;
          });
          if (counter === listVolume.length) {
            this.setState({
              seriesOptions
            });
          }
        }.bind(this)
      );
    }
  }

  afterChartCreated(chart) {
    this.chart = chart;
    // apply the date pickers
    setTimeout(() => {
      $("input.highcharts-range-selector", chart.renderTo).datepicker();
    }, 0);
    $.datepicker.setDefaults({
      dateFormat: "yy-mm-dd",
      onSelect: function(dateText) {
        this.onchange();
        this.onblur();
      }
    });
    this.props.getChart(chart);
    chart.showLoading();
  }

  componentDidMount() {
    this.onFetchData();
  }

  componentDidUpdate(prevProps) {
    if (!equal(prevProps.products, this.props.products)) {
      this.onFetchData();
    }
  }

  render() {
    return (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={P2O5chartOptions(
          this.state.seriesOptions,
          this.props.name,
          this.props.products.length
        )}
        callback={this.afterChartCreated}
      />
    );
  }
}

export default PhosphateChart;
