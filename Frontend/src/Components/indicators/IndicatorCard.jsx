import React, { Component } from "react";

import { Col, Statistic, Icon } from "antd";

class IndicatorCard extends Component {
  constructor(props) {
    super(props);
    this.statChange = this.statChange.bind(this);
    this.statMovement = this.statMovement.bind(this);
    this.getStatIcon = this.getStatIcon.bind(this);
  }

  getStatIcon() {
    if (this.props.change > 0) {
      return <Icon type="arrow-up" />;
    } else if (this.props.change < 0) {
      return <Icon type="arrow-down" />;
    } else {
      return "";
    }
  }

  getStatColor() {
    if (this.props.change > 0) {
      return { color: "#3f8600" };
    } else if (this.props.change < 0) {
      return { color: "#cf1322" };
    } else {
      return { color: "#3f8600" };
    }
  }

  statChange() {
    return (
      <Statistic
        value={this.props.change}
        precision={this.props.change % 1 !== 0 ? 2 : 0}
        valueStyle={this.getStatColor()}
        prefix={this.getStatIcon()}
      />
    );
  }

  statMovement() {
    return (
      <Statistic
        value={this.props.movement}
        precision={this.props.movement % 1 !== 0 ? 2 : 0}
        valueStyle={this.getStatColor()}
        prefix={this.getStatIcon()}
        suffix="%"
      />
    );
  }

  render() {
    return (
      <div className="indicators">
        <div className="card card-stats">
          <div className="card-body ">
            {/* <div className="row"> */}
            {/* <div className="col-7 col-md-8"> */}
            <div className="numbers">
              <p className="card-category">{this.props.label}</p>
              <p className="card-title">{this.props.value}</p>
              <span className="unit">{this.props.unit}</span>
            </div>
            {/* </div> */}
            {/* </div> */}
          </div>
          <div className="card-footer">
            <hr />
            <div className="stats">
              <Col span={12}>{this.statChange()}</Col>
              <Col span={12}>{this.statMovement()}</Col>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IndicatorCard;
