import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import loginImage from '../Images/bitcoin.jpg'
import login from '../Images/ai.jpg'
import login1 from '../Images/vr.jpg'
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Dashboard = () => {
    const posts = [
        {
          id: 1,
          image: loginImage,
          alt: "Fashion model in yellow outfit"
        },
        {
          id: 2,
          image:login,
          alt: "Fashion model in neutral tones"
        },
        {
          id: 3,
          image: login1,
          alt: "Fashion model in striped design"
        }
      ];
      const[featuredPosts,setFeaturedPosts]=useState([]);
      const [isExpanded, setIsExpanded] = useState(false); 

  useEffect (()=>{
    const fetchPosts = async() =>{
      try{
        const response = await axios.get(`${API_BASE_URL}blogsview/`,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('access')}`,
          }
        });
        console.log('Fetched posts:', response.data);
        setFeaturedPosts(response.data)
      }catch(error){
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  },[]);

  const handleToggleDescription = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
   
  <div className="fixed top-0 left-0 w-screen h-screen bg-gray-100">
      <div className="h-full overflow-y-auto">
      <Navbar/>
    
     
      <div className="w-full px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-5xl font-bold text-purple-700 mb-8 mt-3">
          Turn your ideas into impactful blogs
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Manage your blog effortlessly with intuitive tools designed for creators. Organize, edit, and publish content seamlessly in one place. Focus on your ideas while we handle the rest.
          </p>
          <button
            className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors duration-200"
          >
            Browse Posts
          </button>
        </div>
        <div className="w-full px-4 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {posts.map((post,index) => (
              <div 
              key={post.id}
              className="relative overflow-hidden rounded-lg shadow-xl transition-transform duration-300 group hover:shadow-2xl hover:scale-105"
            >
                <img
                  src={post.image}
                  alt={post.alt}
                  className="w-full h-64 object-cover transition-all duration-500 transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
       
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredPosts.map((post) => (
         <div key={post.id} className="bg-gray-50 overflow-hidden shadow-lg rounded-lg flex flex-col p-4 group relative">
         <img src={`https://api.blogcraft.store${post.image}`} alt={post.title} className="w-full h-80 object-cover" />
         <div className="flex-1 p-6 flex flex-col justify-between">
           <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
           <h3 className="text-md font-bold text-gray-900 mt-2">Author:  {post.user.username}</h3>
           <p className={`text-gray-600 mb-4 ${!isExpanded ? 'line-clamp-3' : ''}`}>
          {post.content}
         </p>
         <button 
          onClick={handleToggleDescription}
          className="text-pink-500 hover:text-pink-700 font-medium mt-auto"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
         </div>
         </div>
      ))}
    </div>
      </div>
      
      </div>
    </div>

  )
}

export default Dashboard