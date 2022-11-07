import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Reset from "../pages/Reset";
import Dashboard from "../pages/Dashboard";
import RegisterStore from "../pages/RegisterStore";
import PrivateRoute from "./PrivateRoute";
import ProtectRoute from "./ProtectRoute";
import Main from "../component/dashboard/Main";
import Products from "../component/dashboard/products/Products";
import Stock from "../component/dashboard/stocks/Stock";

const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Main />} />
            <Route path="product" element={<Products />} />
            <Route path="stock" element={<Stock />} />
          </Route>
          <Route path="register/store" element={<RegisterStore />} />
        </Route>

        <Route path="/" element={<ProtectRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset" element={<Reset />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteConfig;
