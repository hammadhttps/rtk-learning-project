 // src/components/Dashboard.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Stories from './Stories';
import CreatePost from './CreatePost';
import Feed from './Feed';
import Trends from './Trends';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto flex">
        <Sidebar />
        
        <div className="flex-1 px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Stories />
              <CreatePost />
              <Feed />
            </div>
            
            <div className="lg:w-80 space-y-4">
              <Trends />
              
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h2 className="font-bold text-xl mb-4">Who to follow</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map(item => (
                    <div key={item} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img 
                          src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 10}.jpg`} 
                          alt="User" 
                          className="w-10 h-10 rounded-full" 
                        />
                        <div>
                          <p className="font-semibold">User {item}</p>
                          <p className="text-gray-500 text-sm">@user{item}</p>
                        </div>
                      </div>
                      <button className="bg-black text-white rounded-full px-4 py-1 text-sm font-bold">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;