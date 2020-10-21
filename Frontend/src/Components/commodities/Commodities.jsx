import React, { Component } from "react";
import Highcharts from "highcharts";
// import ProductsSelect from "../ProductsSelect";
import CommodityChart from "../commodities/CommodityChart";
import Indicators from "../indicators/Indicators";
import { Icon } from "antd";

const products = [
  { id: "C 1 Comdty", name: "Corn" },
  { id: "S 1 Comdty", name: "Soybeans" },
  { id: "W 1 Comdty", name: "Wheat" },
  { id: "SB1 Comdty", name: "Sugar" }
];

class Commodities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products
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
        <p className="charts-title">commodities</p>
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
        <CommodityChart
          name="Commodities"
          products={this.state.products}
          getChart={this.getChart}
        />
        <Indicators getProducts={this.getProducts} products={products} />
      </div>
    );
  }
}

export default Commodities;
