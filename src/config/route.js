import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../components/Login/Login';
import Register from '../components/Register/Register'
import UserDashboard from '../components/UserDashboard/UserDashboard'
import AdminDashboard from '../components/AdminDashboard/AdminDashboard'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainRoute = () => {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/user-dashboard" element={<UserDashboard />}></Route>
        <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default MainRoute
