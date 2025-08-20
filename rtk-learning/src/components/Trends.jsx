import React from 'react'

const Trends = () => {
      const trends = [
    { id: 1, topic: 'Programming', title: '#ReactJS', count: '125K posts' },
    { id: 2, topic: 'Sports', title: '#WorldCup2022', count: '98.7K posts' },
    { id: 3, topic: 'Entertainment', title: 'New Movie', count: '56.2K posts' },
    { id: 4, topic: 'Technology', title: '#AI', count: '42.5K posts' },
    { id: 5, topic: 'Gaming', title: '#NewGameRelease', count: '32.1K posts' },
  ];
  return (
    <div className='bg-white rounded-xl border border-gray-200 p-4 mb-4'>
        <h2 className='font-bold text-xl mb-4'>Trends for you</h2>
    <div className='space-y-4'>
        {trends.map(trend=>(
            <div key={trend.id} className='cursor-pointer hover:bg-gray-50 p-2 rounded'>
                <p className='text-gray-500 text-sm'>{trend.topic} Trending</p>
                <p className='font-bold'>{trend.title}</p>
                <p className='text-gray-500 text-sm'>{trend.count}</p>
            </div>
        ))}
    </div>
    </div>
  )
}

export default Trends