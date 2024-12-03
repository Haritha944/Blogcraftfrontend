import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const BlogDetailComponent = () => {

    const {id} =useParams();
    const [post,setPost]=useState(null);
    const[loading,setLoading]= useState(true);
    const [error,setError] = useState(null);
    

    useEffect(()=>{
      const fetchpost=async()=>{
        try{
          const response=await axios.get(`${API_BASE_URL}posts/${id}`,{
            headers:{
              Authorization:`Bearer ${localStorage.getItem('access')}`,
              'Cache-Control': 'no-cache',
            }
          });
          console.log("Response",response.data)
          setPost(response.data)

        }catch (error) {
          setError(error.response?.data?.message||error.message)
        }finally{
          setLoading(false);
        }
      }
      fetchpost();
    },[id]);
    if (loading) {
      return (
          <div className="fixed top-0 left-0 w-screen h-screen bg-gray-100 flex items-center justify-center">
              <p>Loading...</p>
          </div>
      );
  }

  
  if (error) {
      return (
          <div className="fixed top-0 left-0 w-screen h-screen bg-gray-100 flex items-center justify-center">
              <p className="text-red-500">Error: {error}</p>
          </div>
      );
  }

  
  if (!post) {
      return (
          <div className="fixed top-0 left-0 w-screen h-screen bg-gray-100 flex items-center justify-center">
              <p>No post found</p>
          </div>
      );
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-100">
      <div className="h-full overflow-y-auto">
        <Navbar/>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title || 'Untitled Post'}</h1>
      <p className="text-md text-gray-600 mb-6">By: {post.user.username}</p>
      <img
        src={`https://api.blogcraft.store${post.image}`}
        alt={post.title|| 'Untitled Post'}
        className="w-full h-auto mb-6"
      />
      <p className="text-gray-800 leading-7">{post.content}</p>
    </div>
    </div>
    </div>
  )
}

export default BlogDetailComponent