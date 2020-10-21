import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import Commodities from "./commodities/Commodities";
import Phosphates from "./phosphates/Phosphates";
import RawMaterials from "./rawMaterials/RawMaterials";
import MacroFactors from "./macroFactors/MacroFactors";

class DashboardEcran1 extends Component {
  render() {
    return (
      <div className="content">
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 10 }, 10]}>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Card bordered={false} style={{ height: "464px" }}>
              <Commodities />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Card bordered={false}>
              <Phosphates />
            </Card>
          </Col>
        </Row>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 10 }, 10]}>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Card bordered={false}>
              <RawMaterials />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Card bordered={false} style={{ height: "429px" }}>
              <MacroFactors />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DashboardEcran1;
