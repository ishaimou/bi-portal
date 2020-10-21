import React, { Component } from "react";
import Highcharts from "highcharts";
import RawMaterialChart from "./RawMaterialChart";
import Indicators from "../indicators/Indicators";
import { Icon } from "antd";

var indicators = [
  {
    id: "Ammonia",
    dataset: "Bulk FOB",
    country: "Black Sea Spot",
    name: "Ammonia"
  },
  {
    id: "Sulphur",
    dataset: "Bulk FOB",
    country: "Middle East Spot",
    name: "Sulphur"
  },
  {
    id: "Potash",
    dataset: "Granular Bulk FOB",
    country: "US Midwest East Spot",
    name: "Potash"
  },
  {
    id: "Urea",
    dataset: "Granular Bulk FOB",
    country: "Middle East (all netbacks) Spot",
    name: "Urea"
  }
];

class RawMaterials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: indicators,
      loading: false
    };
    this.chart = {};
    this.getChart = this.getChart.bind(this);
    this.handleFullScreen = this.handleFullScreen.bind(this);
  }

  getProducts = rows => {
    let products = [];
    products = rows.map(row => {
      return { id: row.id, name: row.name };
    });
    if (rows.length) {
      this.setState({
        ...this.state,
        products
      });
    }
  };

  getChart(chart) {
    this.chart = chart;
  }

  handleFullScreen() {
    Highcharts.FullScreen = function(container) {
      this.init(container.parentNode); // main div of the chart
    };

    Highcharts.FullScreen.prototype = {
      init: function(container) {
        if (container.requestFullscreen) {
          container.requestFullscreen();
        } else if (container.mozRequestFullScreen) {
          container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) {
          container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
          container.msRequestFullscreen();
        }
      }
    };
    this.chart.fullscreen = new Highcharts.FullScreen(this.chart.container);
  }

  render() {
    return (
      <div>
        <p className="charts-title">raw materials</p>
        <Icon
          type="fullscreen"
          theme="outlined"
          style={{
            fontSize: "20px",
            position: "absolute",
            top: "0",
            left: "calc(100% - 20px)"
          }}
          onClick={this.handleFullScreen}
        />
        <RawMaterialChart
          name="Raw Materials"
          indicators={indicators}
          products={this.state.products}
          getChart={this.getChart}
        />
        <Indicators
          products={indicators}
          getProducts={this.getProducts}
          type="RAW"
        />
      </div>
    );
  }
}

export default RawMaterials;
