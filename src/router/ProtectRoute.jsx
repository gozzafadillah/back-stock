import { Layout } from "antd";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Auth from "../helper/Auth";

const ProtectRoute = () => {
  if (Auth.isAuthorization()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectRoute;
