import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes ,Navigate } from 'react-router-dom';
import './App.css'
import Register from './Component/Register';
import Login from './Component/Login';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './Component/Dashboard';



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
        </Routes>
      </Router>

    </>
  )
}

export default App
