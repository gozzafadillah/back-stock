import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../config/firebase";

import {
  PieChartOutlined,
  HddOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Card, Col, Layout, Menu, Row } from "antd";
import TableDashboard from "../component/dashboard/TableDashboard";
import { useQuery } from "@apollo/client";
import { GetUserById } from "../config/Apollo/Query";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Product", "2", <ShoppingCartOutlined />),
  getItem("Stock", "3", <HddOutlined />),

  getItem(
    <div onClick={() => logout()} style={{ color: "red" }}>
      Logout
    </div>,
    "4",
    <LogoutOutlined style={{ color: "red" }} />
  ),
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, loading] = useAuthState(auth);
  const { data: dataUser } = useQuery(GetUserById, {
    variables: {
      id: localStorage.getItem("uid"),
    },
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) {
      navigate("/login");
    }
  }, [user, loading]);

  useEffect(() => {
    if (dataUser?.users[0].tokoId === null) {
      navigate("/register/store");
    }
  }, [dataUser]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <h1 style={{ fontSize: "x-large", fontWeight: "bolder" }}>
            Back-Stock App
          </h1>
        </Header>

        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 180,
            }}
          >
            <div className="site-card-wrapper">
              <Row style={{ justifyContent: "center" }} gutter={8}>
                <Col span={4}>
                  <Card
                    style={{ backgroundColor: "#D3e4e4", height: "8rem" }}
                    title="Products"
                    bordered={true}
                  >
                    <h3 style={{ fontWeight: "bold" }}>0</h3>
                  </Card>
                </Col>
                <Col span={4}>
                  <Card
                    style={{ backgroundColor: "#D3e4e4", height: "8rem" }}
                    title="Stock"
                    bordered={true}
                  >
                    <h3 style={{ fontWeight: "bold" }}>0</h3>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 160,
            }}
          >
            <Row gutter={16} style={{ justifyContent: "center" }}>
              <Col span={10}>
                <TableDashboard />
              </Col>
              <Col span={10}>
                <TableDashboard />
              </Col>
            </Row>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
