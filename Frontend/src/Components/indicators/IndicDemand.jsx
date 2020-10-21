import React, { Component } from "react";
import axios from "axios";
import Legend from "./Legend";
import { api } from "../../config";

class IndicDemand extends Component {
  constructor(props) {
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    this.state = {
      indicators: []
    };
  }

  onFetchData() {
    console.log("fetch");
    let counter = 0;
    let products = this.props.products;
    let indicators = [];
    let sources = this.props.sources;
    let region = this.props.region;
    products.forEach((product, i) => {
      axios
        .get(`${api}/demand/?region=${region}&indicator=${product.id}&range=2`)
        .then(res => {
          let data = res.data;
          console.log("data: ", data);
          let value = parseFloat(data[product.id][0].value);
          let prev = parseFloat(data[product.id][1].value);
          indicators.push({
            id: product.id,
            label: product.name,
            value: value % 1 !== 0 ? value : parseInt(value),
            unit: data[product.id][0].unitValue,
            change: value - prev,
            movement: ((value - prev) / Math.abs(prev)) * 100
          });
          counter += 1;
          if (counter === products.length) {
            this.setState({
              indicators
            });
          }
        })
        .catch(error => console.log(error));
    });
  }

  componentDidMount() {
    this.onFetchData();
  }

  render() {
    return (
      <Legend
        getProducts={this.props.getProducts}
        indicators={this.state.indicators}
        defaultValue={this.props.defaultValue}
      />
    );
  }
}

export default IndicDemand;
