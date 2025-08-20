// src/components/Sidebar.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../app/features/auth/authSlice';

const Sidebar = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="hidden md:block w-80 bg-white p-4 overflow-y-auto h-screen sticky top-0">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-500">SocialMix</h1>
      </div>
      
      <nav className="space-y-2">
        <button className="flex items-center space-x-3 p-3 rounded-full hover:bg-blue-50 w-full text-left">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="font-medium">Home</span>
        </button>
        
        <button className="flex items-center space-x-3 p-3 rounded-full hover:bg-blue-50 w-full text-left">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
          <span className="font-medium">Explore</span>
        </button>
        
        <button className="flex items-center space-x-3 p-3 rounded-full hover:bg-blue-50 w-full text-left">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="font-medium">Notifications</span>
        </button>
        
        <button className="flex items-center space-x-3 p-3 rounded-full hover:bg-blue-50 w-full text-left">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="font-medium">Messages</span>
        </button>
        
        <button className="flex items-center space-x-3 p-3 rounded-full hover:bg-blue-50 w-full text-left">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="font-medium">Profile</span>
        </button>
      </nav>
      
      <button className="mt-6 w-full bg-blue-500 text-white rounded-full py-3 font-bold hover:bg-blue-600 transition">
        Post
      </button>
      
      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{user.name}</p>
            <p className="text-gray-500 text-sm truncate">@{user.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;