import React, { Component } from "react";
import DemandSupplySelect from "../DemandSupplySelect";
import SupplyChart from "./SupplyChart";
import { Row, Col } from "antd";
// import equal from "fast-deep-equal";

var indicators = {
  product: ["MAP", "DAP", "MGA", "SSP", "TSP"],
  source: ["CRU", "Fertecon","OCP"],
  region: {
    CRU: [
      "World Total",
      "Europe CIS Total",
      "Africa Total",
      "North America Total",
      "Central South America Total",
      "Asia Total",
      "Oceania Total"
    ],
    FERTCON: [
      "World Total",
      "Southern Asia - Total",
      "Central Asia - Total",
      "Eastern Asia - Total",
      "Eurasia - Total",
      "Middle East - Total",
      "Southeast Asia - Total",
      "Oceania - Total",
      "Europe - Total",
      "North America - Total",
      "Latin America - Total",
      "Africa - Total"
    ]
  }
};

class Supply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: ["MAP", "DAP", "MGA", "SSP", "TSP"],
      sources: ["CRU"],
      region: "World Total",
      loading: false
    };
  }

  getProducts = (products, label) => {
    console.log("products: ", products);

    if (label.length) {
      this.setState({
        ...this.state,
        products
      });
    }
  };

  getSources = (sources, label) => {
    console.log("sources: ", sources);
    if (label.length) {
      this.setState({
        ...this.state,
        sources
      });
    }
  };

  getRegion = region => {
    this.setState({
      ...this.state,
      region
    });
  };

  render() {
    return (
      <Row>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <DemandSupplySelect
            indicators={indicators}
            getProducts={this.getProducts}
            getSources={this.getSources}
            getRegion={this.getRegion}
          />
        </Col>
        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
          <p className="charts-title" style={{ marginBottom: "1%" }}>
            Supply
          </p>
          <SupplyChart
            products={this.state.products}
            sources={this.state.sources}
            region={this.state.region}
            indicators={indicators}
          />
        </Col>
      </Row>
    );
  }
}

export default Supply;
