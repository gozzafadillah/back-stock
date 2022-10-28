import React, { useEffect, useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout, storage } from "../config/firebase";

import {
  PieChartOutlined,
  HddOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";

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
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user === null) navigate("/login");
  }, [user, loading]);

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

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
        />
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
              minHeight: 360,
            }}
          >
            <h1>Hello, this is Dashboard pages</h1>
            <form onSubmit={handleSubmit} className="form">
              <input type="file" />
              <button type="submit">Upload</button>
            </form>
            {!imgUrl && (
              <div className="outerbar">
                <div
                  className="innerbar"
                  style={{ width: `${progresspercent}%` }}
                >
                  {progresspercent}%
                </div>
              </div>
            )}
            {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
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
