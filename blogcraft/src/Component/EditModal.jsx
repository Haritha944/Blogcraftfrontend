import React,{useEffect, useState} from 'react'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const EditModal = ({post,isOpen,onClose,onUpdate}) => {

    const [formData,setFormData]=useState({
        title:post?.title || '',
        content:post?.content || '',
        image: null,
    })
    useEffect(()=>{
       if (post) {
        setFormData({
            title:post.title ||'',
            content:post.content || '',
            image:post.image || null,
        });
       }
 },[post,isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const handleImageChange = (e)=>{
        setFormData({ ...formData, image:e.target.files[0]});
    }

    const handleUpdate = async()=>{
     try{
        const updatedData=new FormData();
        updatedData.append('title',formData.title)
        updatedData.append('content',formData.content)
        if (formData.image instanceof File){
            updatedData.append('image',formData.image)
        }

        const response= await axios.put(
            `${API_BASE_URL}blog/${post.id}/`,updatedData,
            {
              headers:{
                Authorization: `Bearer ${localStorage.getItem('access')}`,
                'Content-Type': 'multipart/form-data',
              },
            }
        );
        onUpdate(response.data);
        onClose();
    }  catch (error) {
        console.error('Error updating post:', error);
      }
    };
  return (
    isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Edit Post</h2>
  
            {/* Title Input */}
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full mb-4 p-2 border"
            />
  
            {/* Image Input */}
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full mb-4 p-2 border"
            />
             {post?.image && !(formData.image instanceof File) && (
              <img
                src={post.image}
                alt="Current"
                className="w-32 h-32 object-cover mb-4"
              />
            )}
  
        
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Content"
              className="w-full mb-4 p-2 border"
            />
  
            
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
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


export default EditModal