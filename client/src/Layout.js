import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import NoPage from "pages/NoPage";
import Contact from "pages/Contact";
import Blogs from "pages/About";
import Home from "pages/Home";
import LoginRegister from "pages/LoginRegister";
import Dashboard from "pages/Dashboard";
import { RequireAuth } from "react-auth-kit";

const Layout = () => {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#222222",
      }}
    >
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<LoginRegister val="login" />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth loginPath="/signin">
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default Layout;
