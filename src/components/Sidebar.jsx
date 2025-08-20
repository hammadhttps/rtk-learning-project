// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logout } from '../app/features/auth/authSlice';

const Sidebar = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('home');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
  };

  const menuItems = [
    { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'explore', label: 'Explore', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { id: 'notifications', label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', badge: 3 },
    { id: 'messages', label: 'Messages', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', badge: 1 },
    { id: 'bookmarks', label: 'Bookmarks', icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' },
    { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  return (
    <div className="hidden md:block w-80 bg-white p-4 overflow-y-auto h-screen sticky top-0 border-r border-gray-200">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text">SocialMix</h1>
        <p className="text-gray-500 text-sm mt-1">Connect • Share • Discover</p>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 w-full text-left transition-all duration-200 group ${
              activeTab === item.id ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-600'} group-hover:text-blue-600 transition-colors`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="font-medium">{item.label}</span>
            </div>
            {item.badge && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center animate-pulse-custom">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
      
      <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full py-3 font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
        Create Post
      </button>
      
      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="relative">
          <div 
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="relative">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full ring-2 ring-blue-100" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{user.name}</p>
              <p className="text-gray-500 text-sm truncate">@{user.username}</p>
            </div>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {showUserMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-fadeIn">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.followers} followers</p>
              </div>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors">
                Settings
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors">
                Help Center
              </button>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;