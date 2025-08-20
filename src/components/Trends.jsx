import React, { useState } from 'react';

const Trends = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const trends = [
    { id: 1, topic: 'Programming', title: '#ReactJS', count: '125K posts', category: 'tech', growth: '+12%' },
    { id: 2, topic: 'Sports', title: '#WorldCup2024', count: '98.7K posts', category: 'sports', growth: '+25%' },
    { id: 3, topic: 'Entertainment', title: 'New Movie Release', count: '56.2K posts', category: 'entertainment', growth: '+8%' },
    { id: 4, topic: 'Technology', title: '#AI', count: '42.5K posts', category: 'tech', growth: '+18%' },
    { id: 5, topic: 'Gaming', title: '#NewGameRelease', count: '32.1K posts', category: 'gaming', growth: '+15%' },
    { id: 6, topic: 'Music', title: '#NewAlbum', count: '28.3K posts', category: 'entertainment', growth: '+22%' },
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'tech', label: 'Tech' },
    { id: 'sports', label: 'Sports' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'gaming', label: 'Gaming' },
  ];

  const filteredTrends = activeCategory === 'all' 
    ? trends 
    : trends.filter(trend => trend.category === activeCategory);

  return (
    <div className='bg-white rounded-xl border border-gray-200 p-4 mb-4 shadow-sm'>
      <div className="flex items-center justify-between mb-4">
        <h2 className='font-bold text-xl'>Trends for you</h2>
        <button className="text-blue-500 hover:text-blue-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 mb-4 overflow-x-auto hide-scrollbar">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeCategory === category.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className='space-y-3'>
        {filteredTrends.map((trend, index) => (
          <div 
            key={trend.id} 
            className='cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 group animate-fadeIn'
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <p className='text-gray-500 text-sm'>{trend.topic} • Trending</p>
                  <span className="text-green-500 text-xs font-semibold bg-green-50 px-2 py-0.5 rounded-full">
                    {trend.growth}
                  </span>
                </div>
                <p className='font-bold text-gray-900 group-hover:text-blue-600 transition-colors'>
                  {trend.title}
                </p>
                <p className='text-gray-500 text-sm mt-1'>{trend.count}</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-200">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-blue-500 hover:text-blue-600 font-medium text-sm py-2 hover:bg-blue-50 rounded-lg transition-colors">
        Show more trends
      </button>
    </div>
  );
};

export default Trends;