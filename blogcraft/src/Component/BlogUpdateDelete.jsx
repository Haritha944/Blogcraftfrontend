import React,{useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import axios from 'axios';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BlogUpdateDelete = () => {

  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false); 
  const [isEditModal,setEditModal]=useState(false);
  const [isDeleteModal,setDeleteModal]=useState(false);
  const [selectedPost, setSelectedPost] = useState(null);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}posts/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`, // Add token if needed
          },
        });
        setFeaturedPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleToggleDescription = () => {
    setIsExpanded((prevState) => !prevState);
  };
  const onEdit=(postId)=>{
      const post=featuredPosts.find((p)=>p.id===postId);
      setSelectedPost(post)
      setEditModal(true)
  }
  const onDelete=(postId)=>{
    const post=featuredPosts.find((p)=>p.id===postId);
    setSelectedPost(post)
    setDeleteModal(true)
  }



  console.log("Response",setFeaturedPosts)
  return (
    <div className='flex h-screen -mt-7 -mx-16'>
      <Sidebar/>
      <div className="bg-white flex-1 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <div key={post.id} className="bg-gray-50 overflow-hidden shadow-lg rounded-lg flex flex-col p-4 group relative">
              <img src={`http://127.0.0.1:8000${post.image}`} alt={post.title} className="w-full h-80 object-cover" />
              <div className="flex-1 p-6 flex flex-col justify-between">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
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
        <div className="absolute bottom-4 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex justify-between z-10">
        <button 
          onClick={() => onEdit(post.id)} 
          className="bg-green-700 py-2 px-4 rounded hover:bg-blue-700 text-white "
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(post.id)} 
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 mx-2"
        >
          Delete
        </button>
      </div>
            </div>
          ))}
        </div>
       
      </div>
    </div>
    <EditModal isOpen={isEditModal}
    onClose={()=>setEditModal(false)}
    post={selectedPost}
    onUpdate={(updatedPost) => {
      setFeaturedPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      );
    }} />
    <DeleteModal isOpen={isDeleteModal} 
    post={selectedPost}
    onClose={()=>setDeleteModal(false)}
    onDelete={(postId)=>{
      setFeaturedPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
    }}/>
    </div>
  )
}

export default BlogUpdateDelete