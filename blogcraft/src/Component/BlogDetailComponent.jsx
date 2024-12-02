import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const BlogDetailComponent = () => {

    const {id} =useParams();
    const [post,setPost]=useState(null);
    const[loading,setLoading]= useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
      const fetchpost=async()=>{
        try{
          const response=await axios.get(`${API_BASE_URL}/posts/${id}`);
          setPost(response.data)
        }catch (error) {
          setError(error.response?.data?.message||error.message)
        }finally{
          setLoading(false);
        }
      }
      fetchpost();
    },[id]);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
      <p className="text-md text-gray-600 mb-6">By: {post.user.username}</p>
      <img
        src={`https://api.blogcraft.store${post.image}`}
        alt={post.title}
        className="w-full h-auto mb-6"
      />
      <p className="text-gray-800 leading-7">{post.content}</p>
    </div>
  )
}

export default BlogDetailComponent