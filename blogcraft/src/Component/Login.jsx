import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginImage from '../Images/freepik__expand__35657.png'


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await axios.post(`${API_BASE_URL}login/`, {
              email,
              password,
          });

          // Save JWT tokens in localStorage
          localStorage.setItem('access', response.data.access);
          localStorage.setItem('refresh', response.data.refresh);

          // Redirect user after successful login (to home page or dashboard)
          navigate('/dashboard');
      } catch (err) {
          // Handle error
          if (err.response && err.response.data) {
              setError(err.response.data.error || 'An error occurred during login.');
          } else {
              setError('Network error. Please try again later.');
          }
      }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"  style={{ backgroundImage: `url(${loginImage})` }}>
    {/* Left Side - Image */}
    <div className="hidden md:block w-1/2">
      
    </div>

    {/* Right Side - Login Form */}
    <div className="w-full md:w-1/2 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Login to your account
          </h2>

          {/* Email Input */}
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          {error && (
              <div className="text-sm text-red-600 mt-2">
                {error}
              </div>
            )}
          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between">
            
            {/* <button
              type="button"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
              onClick={handleClick} >
              Forgot password?
            </button> */}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition duration-150"
          >
            Sign in
          </button>
          <p>Not  have an account? <a href="/" className="text-indigo-600 hover:text-indigo-700">Sign UP</a></p>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login