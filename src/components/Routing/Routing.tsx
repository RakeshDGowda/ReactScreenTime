import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import SignupPage from "../Authentication/SignupPage";
import LoginPage from "../Authentication/LoginPage";
import ErrorPage from "../ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import DashBoard from "../Home/DashBoard";
import HomeTest from "../Home/HomeTest";

const Routing = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<ErrorPage />} />

      <Route element={<ProtectedRoute allowedRoles={["Child"]} />}>
        <Route path="/" element={<HomeTest />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["Parent"]} />}>
        <Route path="/dashboard" element={<DashBoard />}>
          <Route path="profile/:id" element={<HomeTest />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routing;
