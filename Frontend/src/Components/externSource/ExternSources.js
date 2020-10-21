import React, { useState, useEffect } from "react";
import { List, Avatar, Row, Col } from "antd";
import axios from "axios";
import "./exsource.css";
import SourceCard from "./SourceCard";
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

export default function ExternSources() {
  const [sites, setSites] = useState([]);
  const [isloaded, setIsloaded] = useState(false);

  useEffect(() => {
    axios.get(`${network.apiURL}/api/sourceexterne/`).then(res => {
      setSites(res.data);
      setIsloaded(true);
    });
  }, []);

  if (!isloaded) return <div>Loading</div>;
  else {
    return (
      <div style={{ marginLeft: "3%" }}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 4
          }}
          dataSource={sites}
          style={{ width: "80%", margin: "auto", marginTop: "2%" }}
          renderItem={(item, index) => (
            <List.Item>
              <SourceCard app={item} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
