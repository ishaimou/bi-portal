import React from "react";
import { Row, Col } from "antd";

export default function News() {
  return (
    <div>
      <Row
        style={{ width: "100%", paddingTop: "5%", paddingLeft: "2%" }}
        type="flex"
        justify="space-between"
      >
        <Col xs={2} sm={4} md={6} lg={8} xl={8}>
          <div id="widgetmain">
            <div id="rsswidget">
              <iframe
                style={{
                  width: "95%",
                  backgroundColor: "white",
                  height: "50vh"
                }}
                src="http://us1.rssfeedwidget.com/getrss.php?time=1573095492604&amp;x=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3Dfertlizers%26hl%3Den-US%26gl%3DUS%26ceid%3DUS%253Aen&amp;w=200&amp;h=500&amp;bc=333333&amp;bw=1&amp;bgc=transparent&amp;m=20&amp;it=true&amp;t=(default)&amp;tc=333333&amp;ts=15&amp;tb=transparent&amp;il=true&amp;lc=0000FF&amp;ls=14&amp;lb=false&amp;id=true&amp;dc=333333&amp;ds=14&amp;idt=true&amp;dtc=284F2D&amp;dts=12"
                border="0"
                hspace="0"
                vspace="0"
                frameborder="no"
              >
                Reading RSS Feed ...
              </iframe>
            </div>
          </div>
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={8}>
          <div id="widgetmain">
            <div id="rsswidget">
              <iframe
                style={{
                  width: "95%",
                  backgroundColor: "white",
                  height: "50vh"
                }}
                src="http://us1.rssfeedwidget.com/getrss.php?time=1573098149952&amp;x=https%3A%2F%2Fwww.farms.com%2FPortals%2F_default%2FRSS_Portal%2FFeatured_All.xml&amp;w=200&amp;h=500&amp;bc=333333&amp;bw=1&amp;bgc=transparent&amp;m=20&amp;it=true&amp;t=(default)&amp;tc=333333&amp;ts=15&amp;tb=transparent&amp;il=true&amp;lc=0000FF&amp;ls=14&amp;lb=false&amp;id=true&amp;dc=333333&amp;ds=14&amp;idt=true&amp;dtc=284F2D&amp;dts=12"
                border="0"
                hspace="0"
                vspace="0"
                frameborder="no"
              >
                Reading RSS Feed ...
              </iframe>
            </div>
          </div>
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={8}>
          <div id="widgetmain">
            <div id="rsswidget">
              <iframe
                style={{
                  width: "80%",
                  backgroundColor: "white",
                  height: "50vh"
                }}
                src="http://us1.rssfeedwidget.com/getrss.php?time=1573098255743&amp;x=https%3A%2F%2Fwww.cnbc.com%2Fid%2F20910258%2Fdevice%2Frss%2Frss.html&amp;w=200&amp;h=500&amp;bc=333333&amp;bw=1&amp;bgc=transparent&amp;m=20&amp;it=true&amp;t=(default)&amp;tc=333333&amp;ts=15&amp;tb=transparent&amp;il=true&amp;lc=0000FF&amp;ls=14&amp;lb=false&amp;id=true&amp;dc=333333&amp;ds=14&amp;idt=true&amp;dtc=284F2D&amp;dts=12"
                border="0"
                hspace="0"
                vspace="0"
                frameborder="no"
              >
                Reading RSS Feed ...
              </iframe>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
