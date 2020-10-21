import React, { Component } from "react";
import { Row, Col, Select, Button, Typography, Radio } from "antd";

const { Option } = Select;
const { Title } = Typography;

class DemandSupplySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      sources: [],
      region: "World Total",
      productsLabel: [],
      sourcesLabel: [],
      regionLabel: []
    };
  }
  handleSubmit = () => {
    this.props.getProducts(this.state.products, this.state.productsLabel);
    this.props.getSources(this.state.sources, this.state.sourcesLabel);
    this.props.getRegion(this.state.region, this.state.regionLabel);
  };

  handleChangeProduct = (value, label) => {
    this.setState({
      ...this.state,
      products: value,
      productsLabel: label
    });
    this.props.getProducts(value, label);
  };

  handleChangeSource = (value, label) => {
    this.setState({
      ...this.state,
      sources: value,
      sourcesLabel: label
    });
    // console.log("value is = ");
    // console.log(value);
    this.props.getSources(value, label);
  };

  handleChangeRegion = value => {
    console.log("value = ", value.target.value);
    this.setState({
      ...this.state,
      region: value.target.value
      // regionLabel: label
    });
    this.props.getRegion(value.target.value);
  };

  render() {
    const indicators = this.props.indicators;
    return (
      <Row>
        {/* <Col span={24}>
          <Title
            style={{ marginLeft: "5%", marginTop: "5%", fontSize: "18px" }}
            level={4}
          >
            Products :
          </Title>
          <Select
            mode="multiple"
            style={{
              width: "98%",
              paddingLeft: "3%",
              paddingBottom: "5%"
            }}
            size="small"
            placeholder="Select Product"
            defaultValue={[indicators.product[0]]}
            onChange={this.handleChangeProduct}
            optionLabelProp="label"
          >
            {indicators.product.map((indicator, key) => (
              <Option value={indicator} label={indicator} key={key}>
                {" "}
                {indicator}
              </Option>
            ))}
          </Select>
        </Col> */}
        <Col span={24}>
          <Title
            style={{ marginLeft: "5%", marginTop: "5%", fontSize: "18px" }}
            level={4}
          >
            Sources :
          </Title>
          <Select
            mode="multiple"
            style={{
              width: "98%",
              paddingLeft: "3%",
              paddingBottom: "5%"
            }}
            size="small"
            placeholder="Select Source"
            defaultValue={[indicators.source[0]]}
            onChange={this.handleChangeSource}
            optionLabelProp="label"
          >
            {indicators.source.map((indicator, key) => (
              <Option value={indicator} label={indicator} key={key}>
                {" "}
                {indicator}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={24}>
          <Title
            style={{ marginLeft: "5%", marginTop: "5%", fontSize: "18px" }}
            level={4}
          >
            Regions :
          </Title>
          <div>
            <Radio.Group
              onChange={this.handleChangeRegion}
              value={this.state.region}
            >
              {indicators.region["CRU"].map((indicator, key) => (
                <Radio
                  style={{ marginRight: "100%", marginLeft: "3%" }}
                  value={indicator}
                >
                  {indicator}
                </Radio>
              ))}
            </Radio.Group>
          </div>
          {/* <Select
            mode="default"
            style={{
              width: "98%",
              paddingLeft: "3%",
              paddingBottom: "5%"
            }}
            size="small"
            placeholder="Select Region"
            defaultValue={[indicators.region["CRU"][0]]}
            onChange={this.handleChangeRegion}
            optionLabelProp="label"
          >
            {indicators.region["CRU"].map((indicator, key) => (
              <Option value={indicator} label={indicator} key={key}>
                {" "}
                {indicator}
              </Option>
            ))}
          </Select> */}
        </Col>
      </Row>
    );
  }
}

export default DemandSupplySelect;
