import React, { Component } from "react";
import Highcharts from "highcharts";
import MacroFactorChart from "./MacroFactorChart";
import Indicators from "../indicators/Indicators";
import { Icon } from "antd";

var indicators = [
  { id: "XAU Curncy", name: "Gold" },
  { id: "EURUSD Curncy", name: "EUR to USD" },
  { id: "SPX Index", name: "S&P 500" }
];

class MacroFactors extends Component {
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
        <p className="charts-title">macro factors</p>
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
        <MacroFactorChart
          name="Macro Factors"
          indicators={indicators}
          products={this.state.products}
          getChart={this.getChart}
        />
        <Indicators products={indicators} getProducts={this.getProducts} />
      </div>
    );
  }
}

export default MacroFactors;
