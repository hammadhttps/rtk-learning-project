// src/components/Stories.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllStories } from '../app/features/stories/storiesSlice';
import { storyViewed } from '../app/features/stories/storiesSlice';
import { selectCurrentUser } from '../app/features/auth/authSlice';

const Stories = () => {
  const stories = useSelector(selectAllStories);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const handleStoryClick = (id) => {
    dispatch(storyViewed(id));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 shadow-sm">
      <div className="flex space-x-4 overflow-x-auto pb-2 hide-scrollbar">
        {/* Add Your Story */}
        <div className="flex flex-col items-center space-y-2 cursor-pointer group min-w-[70px]">
          <div className="relative">
            <div className="p-0.5 rounded-full bg-gradient-to-tr from-gray-300 to-gray-400">
              <div className="bg-white p-0.5 rounded-full">
                <img 
                  src={currentUser.avatar} 
                  alt="Your story" 
                  className="w-14 h-14 rounded-full object-cover" 
                />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-white group-hover:bg-blue-600 transition-colors">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-center max-w-[70px] truncate font-medium">Your story</p>
        </div>

        {/* Other Stories */}
        {stories.map(story => (
          <div 
            key={story.id} 
            className="flex flex-col items-center space-y-2 cursor-pointer group min-w-[70px]"
            onClick={() => handleStoryClick(story.id)}
          >
            <div className="relative">
              <div className={`p-0.5 rounded-full transition-all duration-200 ${
                story.hasUnseen 
                  ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 animate-pulse-custom' 
                  : 'bg-gray-200'
              }`}>
                <div className="bg-white p-0.5 rounded-full">
                  <img 
                    src={story.avatar} 
                    alt={story.username} 
                    className="w-14 h-14 rounded-full object-cover group-hover:scale-105 transition-transform duration-200" 
                  />
                </div>
              </div>
              {story.hasUnseen && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
              )}
            </div>
            <p className="text-xs text-center max-w-[70px] truncate font-medium group-hover:text-blue-600 transition-colors">
              {story.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;