import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../component/Login";
import Register from "../component/Register";
import Dashboard from "../pages/Dashboard";

const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteConfig;
