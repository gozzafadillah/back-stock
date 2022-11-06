import { Menu, Layout, Image } from "antd";
import React, { useState } from "react";

const { Sider } = Layout;

const SideBar = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

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
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={props.item}
        style={{ marginTop: "10px" }}
      />
    </Sider>
  );
};

export default SideBar;
