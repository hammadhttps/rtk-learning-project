import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllposts } from '../app/features/posts/postSlice'
import Post from './Post';

const Feed = () => {
    const posts=useSelector(selectAllposts);
  return (
    <div className='flex-1 max-w-2xl mx-auto'>
       {posts.map(post=>(
        <Post key={post.id} post={post}/>
       ))}
    </div>
  );
};

export default Feed