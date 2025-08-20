// src/components/Stories.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllStories } from '../app/features/stories/storiesSlice';
import { storyViewed } from '../app/features/stories/storiesSlice';

const Stories = () => {
  const stories = useSelector(selectAllStories);
  const dispatch = useDispatch();

  const handleStoryClick = (id) => {
    dispatch(storyViewed(id));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
      <div className="flex space-x-4 overflow-x-auto pb-2 hide-scrollbar">
        {stories.map(story => (
          <div 
            key={story.id} 
            className="flex flex-col items-center space-y-1 cursor-pointer"
            onClick={() => handleStoryClick(story.id)}
          >
            <div className={`relative p-0.5 rounded-full ${story.hasUnseen ? 'bg-gradient-to-tr from-yellow-400 to-purple-600' : 'bg-gray-200'}`}>
              <div className="bg-white p-0.5 rounded-full">
                <img 
                  src={story.avatar} 
                  alt={story.username} 
                  className="w-14 h-14 rounded-full object-cover" 
                />
              </div>
            </div>
            <p className="text-xs truncate max-w-[70px]">{story.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;