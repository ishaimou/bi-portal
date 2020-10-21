import React from "react";
import { Card, Typography, Button } from "antd";
const { Meta } = Card;
const { Text } = Typography;

export default function SourceCard(props) {
  return (

      <div className="ant-list-item">
        <div className="card card-1" style={{ width: "300px" }}>
          <div className="ant-card-body">
            <div className="ant-card-meta mt-3">
              <div className="ant-card-meta-detail">
                <div className="ant-card-meta-title">
                  <center style={{ fontSize: "1.2em" }}>
                    {props.app.name}
                  </center>
                </div>
                <div className="ant-card-meta-description">
                  <center>"This is the description"</center>
                </div>
              </div>
            </div>
            <center>
              <div
                className="ant-card-cover"
                style={{
                  width: "65%",
                  marginBottom: "17%",
                  marginTop: "14%",
                  height: "50px"
                }}
              >
                <img
                  alt="example"
                  src={props.app.logo}
                  className="imageCard"
                  style={{ height: "100%" }}
                />
              </div>
              <Button
                type="primary"
                size="large"
                style={{
                  backgroundColor: "#81b636",
                  borderColor: "#81b636",
                  width: "50%"
                }}
                onClick={() => {
                  window.open(props.app.website);
                }}
              >
                Connect
              </Button>
            </center>
          </div>
        </div>
      </div>
   
  );
}
