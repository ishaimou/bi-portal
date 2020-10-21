import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import equal from "fast-deep-equal";
import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import { chartOptions } from "../../variables/charts.jsx";
import { api } from "../../config";

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/data")(Highcharts);
require("highcharts/modules/boost")(Highcharts);

//-----------------------------------------------------//
//---            Place Your Theme Here              ---//
//-----------------------------------------------------//

class CommoditiesChart extends Component {
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
    let listIndicators = products.map(products => {
      return products.id;
    });
    const indicators = listIndicators.toString();
    Highcharts.getJSON(
      `${api}/values/?indicator=${indicators}`,
      function(data) {
        let unit;
        listIndicators.forEach((indicator, i) => {
          unit = data[indicator][0].unitValue;
          let dataLength = data[indicator].length;
          let j = 0;
          let price = [];
          for (j; j < dataLength; j += 1) {
            price.push([
              Date.parse(data[indicator][j].date), // the date
              parseFloat(data[indicator][j].value) // the price
            ]);
          }
          seriesOptions[i] = {
            name: products[i].name,
            data: price,
            unit
          };
          seriesCounter += 1;
        });
        if (seriesCounter === listIndicators.length) {
          this.setState({
            seriesOptions,
            unit
          });
          this.chart.hideLoading();
        }
      }.bind(this)
    );
  }

  setDatePicker(chart) {
    // apply the date pickers
    // setTimeout(() => {
    //   $("input.highcharts-range-selector", chart.renderTo).datepicker();
    // }, 0);
    setTimeout(function() {
      $(
        "input.highcharts-range-selector",
        $(chart.container).parent()
      ).datepicker();
    }, 0);
    $.datepicker.setDefaults({
      dateFormat: "yy-mm-dd",
      onSelect: function() {
        this.onchange();
        this.onblur();
      }
    });
  }

  afterChartCreated(chart) {
    this.chart = chart;
    this.props.getChart(chart);
    this.setDatePicker(chart);
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
        options={chartOptions(
          this.state.seriesOptions,
          this.props.name,
          this.props.products.length,
          this.state.unit
        )}
        callback={this.afterChartCreated}
      />
    );
  }
}

export default CommoditiesChart;
