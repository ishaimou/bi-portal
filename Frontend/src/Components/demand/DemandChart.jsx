import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
// import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import equal from "fast-deep-equal";
// import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import { demandSupplyChartOptions } from "../../variables/charts.jsx";
import { Global } from "./../../settings";

const { network } = Global;
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/data")(Highcharts);

var maxYear = 0;

class DemandChart extends Component {
  constructor(props) {
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    // this.afterChartCreated = this.afterChartCreated.bind(this);
    this.state = {
      seriesOptions: []
    };
  }

  let;

  onFetchData() {
    let seriesCounter = 0;
    let seriesOptions = [];
    let products = this.props.products;
    let sources = this.props.sources;
    let region = this.props.region;
    let filter = `region=${region}&product=${products.toString()}&source=${sources.toString()}`;
    console.log("here is filter = ", filter);
    Highcharts.getJSON(
      `${network.apiURL}/api/demand/?${filter}&type=Apparent Demand`,
      function(data) {
        let k = 0;
        sources.forEach((source, index) => {
          products.forEach((indicator, i) => {
            let dataLength = data[indicator].length;
            let j = 0;
            let volume = [];
            for (j; j < dataLength; j += 1) {
              console.log("source = ", data[indicator][j].source);
              console.log("product = ", indicator);
              console.log("date = ", data[indicator][j].year);
              console.log("value = ", data[indicator][j].pfmo);
              if (data[indicator][j].source == source) {
                // if (data[indicator][j].source == "OCP") {
                //   console.log("product = ", indicator);
                //   console.log("date = ", data[indicator][j].year);
                //   console.log("value = ", data[indicator][j].pfmo);
                // }
                volume.push([
                  Date.parse(data[indicator][j].year), // the date
                  parseFloat(data[indicator][j].pfmo) // the price
                ]);
              }
              // console.log(data[indicator][j].source);
            }
            seriesOptions[k++] = {
              name: indicator + " " + source,
              data: volume
            };
            seriesCounter += 1;
            maxYear = data[indicator][j - 1].year;
          });
        });
        if (seriesCounter === products.length * sources.length) {
          this.setState({
            ...this.state,
            seriesOptions
          });
        }
      }.bind(this)
    );
  }

  //   afterChartCreated(chart) {
  //     // apply the date pickers
  //     setTimeout(() => {
  //       $("input.highcharts-range-selector", chart.renderTo).datepicker();
  //     }, 0);
  //     $.datepicker.setDefaults({
  //       dateFormat: "yy-mm-dd",
  //       onSelect: function(dateText) {
  //         this.onchange();
  //         this.onblur();
  //       }
  //     });
  //   }

  componentDidMount() {
    this.onFetchData();
  }

  componentDidUpdate(prevProps) {
    console.log(
      "props: ",
      this.props.products,
      this.props.sources,
      this.props.region
    );
    console.log(
      "prevProps: ",
      this.props.products,
      this.props.sources,
      this.props.region
    );
    if (
      !equal(prevProps.products, this.props.products) ||
      !equal(prevProps.sources, this.props.sources) ||
      !equal(prevProps.region, this.props.region)
    ) {
      console.log("-------------");
      console.log("True");
      console.log("-------------");

      this.onFetchData();
    }
    console.log("-------------");
    console.log("False");
    console.log("-------------");
  }

  render() {
    return (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={demandSupplyChartOptions(
          this.state.seriesOptions,
          this.props.products.length * this.props.sources.length,
          maxYear
        )}
        callback={this.afterChartCreated}
      />
    );
  }
}

export default DemandChart;
