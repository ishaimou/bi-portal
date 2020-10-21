import React, { useState, useEffect, useContext } from "react";
import { List, Spin } from "antd";
import AppCard from "./AppCard";
import axios from "axios";
import { MenuContext } from "../../App";
import { Global } from "./../../settings";

const { network } = Global;

export default function ListApps(props) {
  const [apps, setApps] = useState([]);
  const [isloaded, setIsloaded] = useState(false);
  const { filter } = useContext(MenuContext);
  let ft = 0;

  if (props.match.params.id) ft = props.match.params.id;
  useEffect(() => {
    console.log("test");
    axios.get(`${network.apiURL}/api/appinterne/`).then(res => {
      setApps(res.data);
      setIsloaded(true);
    });
  }, []);

  if (!isloaded)
    return (
      <div>
        <Spin size="large" style={{ marginLeft: "45%", marginTop: "10%" }} />
      </div>
    );
  else {
    return (
      <div style={{ marginLeft: "3%" }}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 4
          }}
          dataSource={apps.filter(
            e =>
              (e !== 0 && ft == 0) ||
              e.thematic.find(x => x == props.match.params.id)
          )}
          style={{ width: "80%", margin: "auto", marginTop: "2%" }}
          renderItem={(item, index) => (
            <List.Item>
              <AppCard app={item} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
