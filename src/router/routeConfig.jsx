import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Reset from "../pages/Reset";
import Dashboard from "../pages/Dashboard";
import RegisterStore from "../pages/RegisterStore";

const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/register/store" element={<RegisterStore />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteConfig;
