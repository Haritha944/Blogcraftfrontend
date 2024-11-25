import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes ,Navigate } from 'react-router-dom';
import './App.css'
import Register from './Component/Register';
import Login from './Component/Login';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './Component/Dashboard';
import Createblog from "./Component/Createblog";
import BlogUpdateDelete from "./Component/BlogUpdateDelete";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

 
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setIsAuthenticated(true); 
    } else {
      setIsAuthenticated(false); 
    }
  }, []); 
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login"element= {isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
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
              <Createblog />
            </PrivateRoute>
          }
        />
        <Route path="/myblogs" element={<BlogUpdateDelete/>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
