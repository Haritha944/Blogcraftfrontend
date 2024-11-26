import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Createblog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate=useNavigate();
  const token = localStorage.getItem('access');
  if (!token) {
    return <div>You must be logged in to create a blog post.</div>;
  }
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form inputs
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const response = await axios.post(
        `${API_BASE_URL}posts/`, 
        formData, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,  // Send the JWT token in the Authorization header
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      navigate('/myblogs');
    } catch (error) {
      console.error('Error creating blog post', error);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  
  const validateForm = () => {
    const validationErrors = {};
    if (!title) validationErrors.title = 'Title is required';
    if (!content) validationErrors.content = 'Content is required';
    if (!image) validationErrors.image = 'Image is required';
    else if (image && !['image/jpeg', 'image/jpg', 'image/png'].includes(image.type)) {
      validationErrors.image = 'Only JPEG, JPG, and PNG images are allowed';
    }
    return validationErrors;
  };
  const handleDashboardRedirect = () => {
    navigate('/dashboard');
  };

  return (
  
    <div className='flex h-screen -mt-8 -mx-16'>
      <Sidebar/>
    <div className="flex-1 max-w-4xl mx-auto p-4 bg-gradient-to-b from-sky-500 via-sky-600 to-sky-700 shadow-md rounded-lg mt-10 ">
     
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Create Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.content && <span className="text-red-500 text-sm">{errors.content}</span>}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image:</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:bg-gray-50 file:hover:bg-gray-100"
          />
          {errors.image && <span className="text-red-600 text-xl">{errors.image}</span>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Submitting...' : 'Create Post'}
        </button>
      </form>
      
    </div>
    </div>
  )
}

export default Createblog