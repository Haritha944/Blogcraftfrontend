import React, { useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NoteIcon from '@mui/icons-material/Note';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const fetchUserDetails = async () => {
        try {
          const token = localStorage.getItem('access'); 
          const response = await axios.get(`${API_BASE_URL}user/details`, {
            headers: { Authorization: `Bearer ${token}` }, 
          });
          console.log(response.data)
          setUser(response.data); 
        } catch (error) {
          console.error('Error fetching user details:', error);
          if (error.response && error.response.status === 401) {
            navigate('/login'); 
          }
        }
      };
    
      useEffect(() => {
        fetchUserDetails(); 
      }, []);
      const handleLogout = () => {
        localStorage.removeItem('access'); 
        
        navigate('/login'); 
      };
  return (
    <div className='-mx-7'>
      <div className="h-full w-full flex flex-col bg-white">
      {/* User Profile Section */}
      <div className="p-8 border-b border-gray-200">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-sky-500">
          <img
            src={`https://api.blogcraft.store/media/profile_images/${user.profile_image}`}
            alt={user.username || 'User Avatar'}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{user.username || 'Guest'}</h2>
          <p className="text-sm text-gray-500">{user.email || 'No email provided'}</p>
          <p className="text-sm text-gray-500">{user.location|| 'No email provided'}</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow p-4 space-y-2">
        <Link 
          to="/dashboard" 
          className="flex items-center p-3 hover:bg-sky-50 rounded-lg transition-colors group"
        >
          <DashboardIcon
            className="mr-3 text-gray-500 group-hover:text-sky-600" 
            size={24} 
          />
          <span className="text-gray-700 group-hover:text-sky-600">Dashboard</span>
        </Link>
        
        <Link 
          to="/myblogs" 
          className="flex items-center p-3 hover:bg-sky-50 rounded-lg transition-colors group"
        >
          <NoteIcon
            className="mr-3 text-gray-500 group-hover:text-sky-600" 
            size={24} 
          />
          <span className="text-gray-700 group-hover:text-sky-600">My Blogs</span>
        </Link>
        
        <Link 
          to="/profile" 
          className="flex items-center p-3 hover:bg-sky-50 rounded-lg transition-colors group"
        >
          <AccountCircleIcon 
            className="mr-3 text-gray-500 group-hover:text-sky-600" 
            size={24} 
          />
          <span className="text-gray-700 group-hover:text-sky-600">Profile</span>
        </Link>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center p-3 hover:bg-red-50 rounded-lg transition-colors group"
        >
          <LogoutIcon
            className="mr-3 text-gray-500 group-hover:text-red-600" 
            size={24} 
          />
          <span className="text-gray-700 group-hover:text-red-600">Logout</span>
        </button>
      </nav>
    </div>
    </div>
  )
}

export default Sidebar