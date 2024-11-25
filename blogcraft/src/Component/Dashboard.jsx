import React from 'react'
import Navbar from './Navbar'
import loginImage from '../Images/bitcoin.jpg'
import login from '../Images/ai.jpg'
import login1 from '../Images/vr.jpg'

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
  return (
   
   
    <div className="min-h-screen -mt-8 w-screen bg-gradient-to-t from-blue-400 to-sky-600 overflow-x-hidden">
      
      <Navbar/>
    
      {/* Hero Section */}
      <div className="w-full px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
          Exploring the Latest Innovations in Technology
          </h1>
          <p className="text-lg text-gray-200 mb-12 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. 
            Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis 
            tellus. Nullam quis imperdiet augue. Vestibulum.
          </p>
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors duration-200"
          >
            Browse Posts
          </button>
        </div>

        {/* Image Grid - Full Width */}
        <div className="w-full px-4 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {posts.map((post) => (
              <div 
                key={post.id}
                className="relative overflow-hidden rounded-lg shadow-xl hover:transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={post.image}
                  alt={post.alt}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customize Button */}
      
    </div>

  )
}

export default Dashboard