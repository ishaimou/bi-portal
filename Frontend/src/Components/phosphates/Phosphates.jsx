import React, { Component } from "react";
import Highcharts from "highcharts";
import PhosphateChart from "./PhosphateChart";
import Indicators from "../indicators/Indicators";
import { Icon } from "antd";

var indicators = [
  {
    id: "DAP",
    dataset: "Bulk FOB",
    country: "Morocco Spot",
    name: "DAP",
    volume: true
  },
  {
    id: "MAP",
    dataset: "Granular Bulk FOB",
    country: "Morocco Spot",
    name: "MAP",
    volume: true
  },
  {
    id: "TSP",
    dataset: "Granular Bulk FOB",
    country: "Morocco Spot",
    name: "TSP",
    volume: true
  },
  {
    id: "SSP",
    dataset: "Bulk CPT",
    country: "Brazil inland 18-20% P2O5 Spot",
    name: "SSP"
  },
  {
    id: "Phosphoric Acid",
    dataset: "Bulk FOB",
    country: "North Africa Q4 2019 100% P2O5 Contract",
    name: "Phosphoric Acid",
    volume: true
  },
  {
    id: "Phosphate Rock",
    dataset: "Bulk FOB",
    country: "Morocco (68-72% BPL) Contract",
    name: "Phosphate Rock",
    volume: true
  }
];

class Phosphates extends Component {
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

  is_true(product) {
    let i = 0;
    let len = indicators.length;
    for (i; i < len; i++) {
      if (indicators[i].name === product.name && indicators[i].volume) {
        return true;
      }
    }
    return false;
  }

  getProducts = rows => {
    let products = [];
    products = rows.map(row => {
      return { id: row.id, name: row.name, volume: this.is_true(row) };
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
      this.init(container.parentNode);
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
        <p className="charts-title">P2O5</p>
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
        <PhosphateChart
          name="P2O5"
          indicators={indicators}
          products={this.state.products}
          getChart={this.getChart}
        />
        <Indicators
          products={indicators}
          getProducts={this.getProducts}
          type="P2O5"
        />
      </div>
    );
  }
}

export default Phosphates;
