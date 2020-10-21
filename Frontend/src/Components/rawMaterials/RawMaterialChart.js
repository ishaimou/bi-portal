import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import equal from "fast-deep-equal";
import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import { RawchartOptions } from "../../variables/charts.jsx";
import { api } from "../../config";

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/boost")(Highcharts);
require("highcharts/modules/data")(Highcharts);

class RawMaterialChart extends Component {
  constructor(props) {
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    this.afterChartCreated = this.afterChartCreated.bind(this);
    this.state = {
      seriesOptions: [],
      unit: ""
    };
    this.chart = {};
  }

  onFetchData() {
    let seriesCounter = 0;
    let seriesOptions = [];
    let products = this.props.products;
    let indicators = this.props.indicators;
    const Filter = () => {
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
        let unit;
        products.forEach((product, i) => {
          unit = data[product.id][0].unitValue;
          let dataLength = data[product.id].length;
          let j = 0;
          let price = [];
          for (j; j < dataLength; j += 1) {
            price.push([
              Date.parse(data[product.id][j].date), // the date
              parseFloat(data[product.id][j].value) // the price
            ]);
          }
          seriesOptions[i] = {
            name: products[i].name,
            data: price,
            unit
          };
          seriesCounter += 1;
        });
        if (seriesCounter === products.length) {
          this.setState({
            seriesOptions,
            unit
          });
          this.chart.hideLoading();
        }
      }.bind(this)
    );
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
        options={RawchartOptions(this.state.seriesOptions, this.state.unit)}
        callback={this.afterChartCreated}
      />
    );
  }
}

export default RawMaterialChart;
