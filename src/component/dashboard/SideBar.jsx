import { Menu, Layout, Image } from "antd";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const { Sider } = Layout;

const SideBar = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  const getPath = useLocation().pathname;
  let path = "";
  if (getPath === "/dashboard") path = "1";
  else if (getPath === "/dashboard/product") path = "2";
  else if ("/dashboard/product") path = "3";

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Image
        preview={{
          visible: false,
        }}
        src={props.img}
        onClick={() => setVisible(true)}
      />

      <div
        style={{
          display: "none",
        }}
      >
        <Image.PreviewGroup
          preview={{
            visible,
            onVisibleChange: (vis) => setVisible(vis),
          }}
        >
          <Image src={props.img} />
        </Image.PreviewGroup>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={{ path }}
        mode="inline"
        items={props.item}
        style={{ marginTop: "10px" }}
      />
    </Sider>
  );
};

export default SideBar;
