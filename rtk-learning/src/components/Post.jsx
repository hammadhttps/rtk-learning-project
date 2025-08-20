// src/components/Post.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postLiked, commentAdded } from '../app/features/posts/postSlice';

const Post = ({ post }) => {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(postLiked(post.id));
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      dispatch(commentAdded({
        postId: post.id,
        comment: {
          id: Date.now(),
          text: commentText,
          user: {
            id: 1,
            name: 'Current User',
            username: 'currentuser',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
          date: new Date().toISOString(),
        }
      }));
      setCommentText('');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
      <div className="flex space-x-3">
        <img src={post.user.avatar} alt={post.user.name} className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center space-x-1">
            <h3 className="font-semibold">{post.user.name}</h3>
            <span className="text-gray-500">@{post.user.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{formatDate(post.date)}</span>
          </div>
          
          <p className="mt-2 mb-3">{post.content}</p>
          
          {post.image && (
            <img src={post.image} alt="Post" className="rounded-xl mb-3 max-h-96 object-cover w-full" />
          )}
          
          <div className="flex justify-between text-gray-500 pt-2 border-t border-gray-100">
            <button 
              onClick={handleLike}
              className="flex items-center space-x-1 hover:text-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{post.likes}</span>
            </button>
            
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 hover:text-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{post.comments.length}</span>
            </button>
            
            <button className="flex items-center space-x-1 hover:text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>{post.shares}</span>
            </button>
          </div>
          
          {showComments && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <form onSubmit={handleComment} className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="bg-blue-500 text-white rounded-full px-4 font-bold disabled:bg-blue-200 disabled:cursor-not-allowed"
                >
                  Reply
                </button>
              </form>
              
              <div className="space-y-3">
                {post.comments.map(comment => (
                  <div key={comment.id} className="flex space-x-2">
                    <img src={comment.user.avatar} alt={comment.user.name} className="w-8 h-8 rounded-full" />
                    <div className="flex-1 bg-gray-100 rounded-xl p-3">
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold text-sm">{comment.user.name}</span>
                        <span className="text-gray-500 text-xs">@{comment.user.username}</span>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;