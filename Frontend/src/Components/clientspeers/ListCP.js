import React, { useEffect, useState, useContext } from "react";
import { List, Avatar, Row, Col, Tag } from "antd";
import axios from "axios";
import Flag from "react-world-flags";
import { MenuContext } from "../../App";
import { Global } from "./../../settings";

const { network } = Global;
const data = [
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  }
];

export default function ListCP(props) {
  const [data, setData] = useState([]);
  const { tp } = useContext(MenuContext);
  const [isloaded, setIsloaded] = useState(false);
  useEffect(() => {
    axios.get(`${network.apiURL}/api/clients/`).then(res => {
      console.log("test");

      setData(res.data);
      setIsloaded(true);
    });
  }, []);

  if (!isloaded) {
    return <div>loading</div>;
  } else {
    return (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={data}
          style={{
            width: "60%",
            margin: "auto",
            marginTop: "2%",
            backgroundColor: "#fff"
          }}
          renderItem={item => (
            <List.Item
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.open(item.site);
              }}
            >
              <Row style={{ width: "100%", padding: "10px" }}>
                <Col xs={24} sm={2} md={2} lg={2} xl={2}>
                  <Avatar src={item.brandlogo} />
                </Col>
                <Col xs={24} sm={19} md={19} lg={19} xl={12}>
                  {item.name}
                </Col>
                <Col xs={24} sm={2} md={2} lg={2} xl={5}>
                  <Flag code={item.country} height="16" />
                </Col>
                <Col xs={24} sm={1} md={1} lg={1} xl={5}>
                  {item.products.map(p => {
                    if (p == "Acid") {
                      return <Tag color="magenta">{p}</Tag>
                    }
                    else if (p == 'Fertilizer') {
                      return <Tag color="purple">{p}</Tag>
                    }
                    else {
                      return <Tag color="orange">{p}</Tag>
                    }
                  })}
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
