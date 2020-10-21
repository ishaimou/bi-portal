import React from "react";

export default function TestComp() {
  return (
    <div id="widgetmain">
      Test
      <div id="rsswidget">
        <iframe
          src="http://us1.rssfeedwidget.com/getrss.php?time=1573063849371&amp;x=http%3A%2F%2Fwww.cnbc.com%2Fid%2F19746125%2Fdevice%2Frss%2Frss.xml&amp;w=1000&amp;h=500&amp;bc=333333&amp;bw=1&amp;bgc=transparent&amp;m=20&amp;it=true&amp;t=(default)&amp;tc=333333&amp;ts=15&amp;tb=transparent&amp;il=true&amp;lc=0000FF&amp;ls=14&amp;lb=false&amp;id=true&amp;dc=333333&amp;ds=14&amp;idt=true&amp;dtc=284F2D&amp;dts=12"
          border="0"
          hspace="0"
          vspace="0"
          frameborder="no"
          marginwidth="0"
          marginheight="0"
          id="rssOutput"
        >
          Reading RSS Feed ...
        </iframe>
      </div>
    </div>
  );
}
