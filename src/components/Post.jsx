// src/components/Post.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postLiked, postUnliked, postShared, commentAdded, postDeleted } from '../app/features/posts/postSlice';
import { selectCurrentUser } from '../app/features/auth/authSlice';

const Post = ({ post }) => {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const handleLike = () => {
    if (isLiked) {
      dispatch(postUnliked(post.id));
    } else {
      dispatch(postLiked(post.id));
    }
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    dispatch(postShared(post.id));
    // Show a toast or notification here
    alert('Post shared!');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(postDeleted(post.id));
    }
    setShowOptions(false);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      dispatch(commentAdded({
        postId: post.id,
        comment: {
          id: Date.now(),
          text: commentText,
          user: currentUser,
          date: new Date().toISOString(),
        }
      }));
      setCommentText('');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours}h`;
    return date.toLocaleDateString();
  };

  const canDelete = currentUser.id === post.user.id;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 animate-fadeIn hover:shadow-lg transition-shadow duration-300">
      <div className="flex space-x-3">
        <img src={post.user.avatar} alt={post.user.name} className="w-12 h-12 rounded-full ring-2 ring-blue-100" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <h3 className="font-semibold hover:underline cursor-pointer">{post.user.name}</h3>
              <span className="text-gray-500">@{post.user.username}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500">{formatDate(post.date)}</span>
            </div>
            
            {canDelete && (
              <div className="relative">
                <button 
                  onClick={() => setShowOptions(!showOptions)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                
                {showOptions && (
                  <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <button 
                      onClick={handleDelete}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Delete Post
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <p className="mt-2 mb-3 text-gray-900 leading-relaxed">{post.content}</p>
          
          {post.image && (
            <img 
              src={post.image} 
              alt="Post" 
              className="rounded-xl mb-3 max-h-96 object-cover w-full cursor-pointer hover:opacity-95 transition-opacity" 
              onClick={() => window.open(post.image, '_blank')}
            />
          )}
          
          <div className="flex justify-between text-gray-500 pt-2 border-t border-gray-100">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-1 hover:text-red-500 transition-colors group ${isLiked ? 'text-red-500' : ''}`}
            >
              <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="font-medium">{post.likes}</span>
            </button>
            
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 hover:text-blue-500 transition-colors group"
            >
              <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="font-medium">{post.comments.length}</span>
            </button>
            
            <button 
              onClick={handleShare}
              className="flex items-center space-x-1 hover:text-green-500 transition-colors group"
            >
              <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <span className="font-medium">{post.shares}</span>
            </button>

            <button className="flex items-center space-x-1 hover:text-purple-500 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-purple-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
            </button>
          </div>
          
          {showComments && (
            <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
              <form onSubmit={handleComment} className="flex space-x-2 mb-4">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full" />
                <div className="flex-1 flex space-x-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="bg-blue-500 text-white rounded-full px-4 py-2 font-bold disabled:bg-blue-200 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                  >
                    Reply
                  </button>
                </div>
              </form>
              
              <div className="space-y-3">
                {post.comments.map(comment => (
                  <div key={comment.id} className="flex space-x-2 animate-fadeIn">
                    <img src={comment.user.avatar} alt={comment.user.name} className="w-8 h-8 rounded-full" />
                    <div className="flex-1 bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold text-sm">{comment.user.name}</span>
                        <span className="text-gray-500 text-xs">@{comment.user.username}</span>
                        <span className="text-gray-500 text-xs">·</span>
                        <span className="text-gray-500 text-xs">{formatDate(comment.date)}</span>
                      </div>
                      <p className="text-sm mt-1">{comment.text}</p>
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