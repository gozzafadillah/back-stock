import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../config/firebase";
import imgDef from "../assets/img/download.png";

import {
  PieChartOutlined,
  HddOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import { GetUserById } from "../config/Apollo/Query";
import SideBar from "../component/dashboard/SideBar";
import Cookies from "js-cookie";
import { useQuery } from "@apollo/client";

const { Header, Content, Footer } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Dashboard = () => {
  const [loading] = useAuthState(auth);
  const { data: dataUser, loading: getUserLoading } = useQuery(GetUserById, {
    variables: {
      id: Cookies.get("id"),
    },
  });
  let img = "";

  useEffect(() => {
    if (dataUser?.users[0].toko === null) {
      alert("harap daftar toko ", navigate("/register/store"));
    } else {
      Cookies.set("tokoId", dataUser?.users[0].toko.id);
    }
  });

  const navigate = useNavigate();

  const logoutBtn = () => {
    logout();
    navigate("/login");
  };

  const items = [
    getItem(<Link to="/dashboard">Dashboard</Link>, "1", <PieChartOutlined />),
    getItem(
      <Link to="/dashboard/product">Products</Link>,
      "2",
      <ShoppingCartOutlined />
    ),
    getItem(<Link to="/dashboard/stock">Stock</Link>, "3", <HddOutlined />),

    getItem(
      <div onClick={() => logoutBtn()} style={{ color: "red" }}>
        Logout
      </div>,
      "4",
      <LogoutOutlined style={{ color: "red" }} />
    ),
  ];

  if (dataUser?.users[0]?.toko?.image) {
    img = dataUser?.users[0]?.toko.image;
  } else {
    img = imgDef;
  }

  return (
    <>
      {getUserLoading && loading ? (
        <h1>Loading</h1>
      ) : (
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <SideBar item={items} img={img} />
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
              <Outlet />
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
      )}
    </>
  );
};

export default Dashboard;
