import React,{useState} from 'react'
import axios from 'axios';
import {useForm} from "react-hook-form"
import { useNavigate,Link } from 'react-router-dom';
import loginImage from '../Images/blog.png'



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");
  const [serveerrors, setErrors] = useState({});
  const navigate = useNavigate();

  

  const onSubmit = async (formData) => {
    const data = new FormData();
  
    // Append all form fields
    for (let key in formData) {
      if (key === "profile_image" && formData[key][0]) {
        data.append(key, formData[key][0]); 
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(`${API_BASE_URL}register/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { access, refresh, message } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem('user', JSON.stringify({
        name: response.data.name,
        email: response.data.email,
      }));
      setMessage(message);
      setErrors({});
      reset(); 
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  };
    
  return (
    <div
    className="fixed top-0 left-0 w-screen h-screen flex overflow-y-auto">
      <div
    className="w-full sm:w-1/2 h-[90vh] bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${loginImage})` }}
  ></div>

  
  <div className="w-full sm:w-1/2 h-full flex items-center justify-center bg-white mt-4">
    <form
      className="p-8 rounded shadow-md w-full max-w-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {message && <p className="text-green-600">{message}</p>}

      <div className="flex space-x-4 mb-4">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          {...register('username', { required: 'Username is required' })}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
      </div>

      {/* Email */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: 'Enter a valid email',
            },
          })}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
      </div>
      </div>
      <div className="flex flex-wrap space-x-4 mb-4">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="text"
          {...register('phone_number', {
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Phone number must be 10 digits',
            },
          })}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.phone_number && <p className="text-red-600 text-sm">{errors.phone_number.message}</p>}
      </div>
     
      {/* Profile Image */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Profile Image</label>
        <input
          type="file"
          {...register('profile_image', { required: 'Profile image is required' })}
          className="w-full"
        />
        {errors.profile_image && <p className="text-red-600 text-sm">{errors.profile_image.message}</p>}
      </div>
      </div>
      <div className="flex flex-wrap space-x-4 mb-4">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          {...register('location', { required: 'Location is required' })}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.location && <p className="text-red-600 text-sm">{errors.location.message}</p>}
      </div>

      {/* Date of Birth */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Date of Birth</label>
        <input
          type="date"
          {...register('date_of_birth', { required: 'Date of birth is required' })}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.date_of_birth && <p className="text-red-600 text-sm">{errors.date_of_birth.message}</p>}
      </div>
     </div>
      {/* Social Links */}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Social Links (JSON)</label>
        <textarea
          {...register('social_links', { required: 'Social links are required' })}
          className="w-full border border-gray-300 p-1 rounded"
        />
        {errors.social_links && <p className="text-red-600 text-sm">{errors.social_links.message}</p>}
      </div>

      {/* Password */}
      <div className="flex flex-wrap space-x-4 mb-4">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
          })}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
      </div>

      {/* Confirm Password */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Confirm Password</label>
        <input
          type="password"
          {...register('confirm_password', { required: 'Confirm Password is required' })}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.confirm_password && <p className="text-red-600 text-sm">{errors.confirm_password.message}</p>}
      </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
      >
        Register
      </button>
      <p className="mt-4 text-center text-gray-800">
        Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-700">Login here</Link>
      </p>
    </form>
  </div>
  </div>
  )
}

export default Register