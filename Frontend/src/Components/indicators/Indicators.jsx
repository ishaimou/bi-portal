import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import Legend from "./Legend";
import { api } from "../../config";

class Indicators extends Component {
  constructor(props) {
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    this.state = {
      indicators: [],
      loading: true
    };
  }

  onFetchData() {
    let counter = 0;
    let products = this.props.products;
    let indicators = [];
    let request = "";
    let type = this.props.type;
    products.forEach((product, i) => {
      if (type) {
        request = `${api}/values/?indicator=${product.id}&dataset=${product.dataset}&country=${product.country}&range=2`;
      } else {
        request = `${api}/values/?indicator=${product.id}&range=2`;
      }
      axios
        .get(request)
        .then(res => {
          let data = res.data;
          let value = parseFloat(data[product.id][0].value);
          let prev = parseFloat(data[product.id][1].value);
          indicators.push({
            id: product.id,
            label: product.name,
            value: value % 1 !== 0 ? value : parseInt(value),
            unit: data[product.id][0].unitValue,
            change: value - prev,
            movement: ((value - prev) / Math.abs(prev)) * 100,
            frequency: data[product.id][0].frequency,
            date: moment(data[product.id][0].date).format("D MMM YYYY")
          });
          counter += 1;
          if (counter === products.length) {
            this.setState({
              indicators,
              loading: false
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
        products={this.props.products}
        loading={this.state.loading}
      />
    );
  }
}

export default Indicators;
