import { Layout } from "antd";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Auth from "../helper/Auth";

const PrivateRoute = () => {
  if (!Auth.isAuthorization()) {
    return <Navigate to="/login" replace />;
  }
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PrivateRoute;
