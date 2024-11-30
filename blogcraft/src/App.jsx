import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes ,Navigate, NavLink } from 'react-router-dom';
import './App.css'
import Register from './Component/Register';
import Login from './Component/Login';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './Component/Dashboard';
import Createblog from "./Component/Createblog";
import BlogUpdateDelete from "./Component/BlogUpdateDelete";
import Navbar from "./Component/Navbar";



function App() {
 
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login"element= {<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/blogcreate"
          element={
            <PrivateRoute>
              <Createblog/>
            </PrivateRoute>
          }
        />
        <Route path="/myblogs" element={<BlogUpdateDelete />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
