import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import Phosphates from "./demand/Demand";
import Supply from "./supply/Supply";

class DashboardEcran2 extends Component {
  render() {
    return (
      <div className="content">
        <Row gutter={[8, 16]}>
          <Col span={24}>
            <Card bordered={false} style={{ minHeight: "0px" }}>
              <Phosphates />
            </Card>
          </Col>
        </Row>
        <Row gutter={[8, 16]}>
          <Col span={24}>
            <Card bordered={false} style={{ minHeight: "0px" }}>
              <Supply />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DashboardEcran2;
