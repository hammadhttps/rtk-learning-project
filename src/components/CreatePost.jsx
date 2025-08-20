// src/components/CreatePost.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAdded } from '../app/features/posts/postSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../app/features/auth/authSlice';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const maxChars = 280;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() || image) {
      dispatch(postAdded(content, image));
      setContent('');
      setImage(null);
      setCharCount(0);
      setIsExpanded(false);
    }
  };

  const handleContentChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setContent(text);
      setCharCount(text.length);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setContent('');
    setImage(null);
    setCharCount(0);
    setIsExpanded(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex space-x-3">
        <div className="relative">
          <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full ring-2 ring-blue-100" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <textarea
                value={content}
                onChange={handleContentChange}
                onFocus={handleFocus}
                placeholder="What's happening?"
                className={`w-full border-none focus:ring-0 resize-none placeholder-gray-500 text-lg p-2 outline-none transition-all duration-200 ${
                  isExpanded ? 'min-h-[120px]' : 'min-h-[60px]'
                }`}
              />
              {isExpanded && (
                <div className={`absolute bottom-2 right-2 text-sm ${
                  charCount > maxChars * 0.8 ? 'text-red-500' : 'text-gray-400'
                }`}>
                  {charCount}/{maxChars}
                </div>
              )}
            </div>
            
            {image && (
              <div className="relative my-3 animate-fadeIn">
                <img src={image} alt="Preview" className="rounded-xl max-h-60 object-cover w-full" />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white rounded-full p-2 hover:bg-opacity-90 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            
            {isExpanded && (
              <div className="flex items-center justify-between border-t border-gray-100 pt-3 animate-fadeIn">
                <div className="flex space-x-1 text-blue-500">
                  <label htmlFor="image-upload" className="cursor-pointer p-2 rounded-full hover:bg-blue-50 transition-colors group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  
                  <button type="button" className="p-2 rounded-full hover:bg-blue-50 transition-colors group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>

                  <button type="button" className="p-2 rounded-full hover:bg-blue-50 transition-colors group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM6 6v12h8V6H6zM8 8v8h2V8H8zM12 8v8h2V8h-2z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 rounded-full font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!content.trim() && !image}
                    className={`px-6 py-2 rounded-full font-bold transition-all duration-200 ${
                      content.trim() || image 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 shadow-lg' 
                        : 'bg-blue-200 text-blue-400 cursor-not-allowed'
                    }`}
                  >
                    Post
                  </button>
                </div>
              </div>
            )}

            {!isExpanded && (
              <div className="flex items-center justify-between pt-2">
                <div className="flex space-x-1 text-blue-500">
                  <label htmlFor="image-upload-simple" className="cursor-pointer p-1 rounded-full hover:bg-blue-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <input
                      id="image-upload-simple"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={!content.trim() && !image}
                  className={`px-4 py-1.5 rounded-full font-bold transition-colors ${
                    content.trim() || image 
                      ? 'bg-blue-500 text-white hover:bg-blue-600' 
                      : 'bg-blue-200 text-blue-400 cursor-not-allowed'
                  }`}
                >
                  Post
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;