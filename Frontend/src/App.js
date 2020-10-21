import React, { useState, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./Components/Layout/NavBar";
import ListApps from "./Components/apps/ListApps";
import External from "./Components/externSource/ExternSources";
import { Layout } from "antd";
import SubNavBar from "./Components/Layout/SubNavBar";
import ListCP from "./Components/clientspeers/ListCP";
import ListPeers from "./Components/clientspeers/ListPeers";
import DashboardEcran1 from "./Components/DashboardEcran1";
import DashboardEcran2 from "./Components/DashboardEcran2";
import News from "./Components/news/News";
export const MenuContext = createContext();

export default function App() {
  const [current, setCurrent] = useState(0);
  const [filter, setFilter] = useState(0);
  const [tp, setTp] = useState(0);
  const [listMenu] = useState([
    {
      menu: "apps",
      page: 1,
      titles: [
        "all apps",
        "market",
        "farmer & agriculture",
        "reglementary",
        "finance",
        "geo politics",
        "risk"
      ],
      url: ""
    },
    {
      menu: "external resources",
      page: 2,
      titles: ["management", "finance", "hr"],
      url: "/extsource"
    },
    {
      menu: "client_peers",
      page: 3,
      titles: ["clients", "peers"],
      url: "/cltpeers"
    },
    {
      menu: "mynews",
      page: 4,
      titles: ["information", "analyses"]
    },
    {
      menu: "bi dashborad",
      page: 5,
      titles: ["price & Volumes", "Supply & Demand"],
      url: "/dashboard"
    }
  ]);
  return (
    <Layout className="layout" style={{ height: "100vh" }}>
      <MenuContext.Provider
        value={{ current, setCurrent, listMenu, filter, setFilter, tp, setTp }}
      >
        <BrowserRouter>
          <NavBar />
          <SubNavBar />
          <Switch>
            <Route exact path="/news" component={News} />
            <Route exact path="/:id" component={ListApps} />
            <Route exact path="/" component={ListApps} />
            <Route exact path="/extsource/:id" component={External} />
            <Route exact path="/cltpeers/0" component={ListCP} />
            <Route exact path="/cltpeers/1" component={ListPeers} />
            <Route exact path="/dashboard/0" component={DashboardEcran1} />
            <Route exact path="/dashboard/1" component={DashboardEcran2} />
          </Switch>
        </BrowserRouter>
      </MenuContext.Provider>
    </Layout>
  );
}
