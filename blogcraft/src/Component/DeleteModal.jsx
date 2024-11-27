import React from 'react'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DeleteModal = ({isOpen,onClose,onDelete,post}) => {

    const handleDelete=async()=>{
        try{
            await axios.delete(`${API_BASE_URL}blog/${post.id}/`,{
                headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
            });
            onDelete(post.id)
            onClose()
        }catch(error){
            console.error('Error deleting post:', error);
        }
    };
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-4">
            Are you sure you want to delete this post?
          </h2>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );
};


export default DeleteModal