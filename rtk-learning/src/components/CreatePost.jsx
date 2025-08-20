// src/components/CreatePost.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAdded } from '../app/features/posts/postSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../app/features/auth/authSlice';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() || image) {
      dispatch(postAdded(content, image));
      setContent('');
      setImage(null);
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
      <div className="flex space-x-3">
        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full border-none focus:ring-0 resize-none placeholder-gray-500 text-lg p-2 min-h-[60px]"
            />
            
            {image && (
              <div className="relative my-2">
                <img src={image} alt="Preview" className="rounded-lg max-h-60 object-cover w-full" />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white rounded-full p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            
            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <div className="flex space-x-2 text-blue-500">
                <label htmlFor="image-upload" className="cursor-pointer p-1 rounded-full hover:bg-blue-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                
                <button type="button" className="p-1 rounded-full hover:bg-blue-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              
              <button
                type="submit"
                disabled={!content.trim() && !image}
                className={`px-4 py-1.5 rounded-full font-bold ${content.trim() || image ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-200 text-blue-400 cursor-not-allowed'}`}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;