import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      content: "Just launched my new project! Excited to share it with everyone 🚀",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
      date: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      likes: 24,
      comments: [
        {
          id: 1,
          text: "Congratulations! This looks amazing!",
          user: {
            id: 2,
            name: "Sarah Wilson",
            username: "sarahw",
            avatar: "https://randomuser.me/api/portraits/women/5.jpg",
          },
          date: new Date(Date.now() - 1800000).toISOString(),
        }
      ],
      shares: 5,
      user: {
        id: 3,
        name: "Alex Johnson",
        username: "alexj",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      },
    },
    {
      id: 2,
      content: "Beautiful sunset from my evening walk. Nature never fails to amaze me! 🌅",
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
      date: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      likes: 42,
      comments: [],
      shares: 8,
      user: {
        id: 4,
        name: "Emma Davis",
        username: "emmad",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      },
    }
  ],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.unshift(action.payload);
      },
      prepare(content, image = null) {
        return {
          payload: {
            id: Date.now(),
            content,
            image,
            date: new Date().toISOString(),
            likes: 0,
            comments: [],
            shares: 0,
            user: {
              id: 1,
              name: "John Doe",
              username: "johndoe",
              avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            },
          },
        };
      },
    },

    postLiked: (state, action) => {
      const post = state.posts.find((post) => post.id === action.payload);
      if (post) {
        post.likes++;
      }
    },

    postUnliked: (state, action) => {
      const post = state.posts.find((post) => post.id === action.payload);
      if (post && post.likes > 0) {
        post.likes--;
      }
    },

    postShared: (state, action) => {
      const post = state.posts.find((post) => post.id === action.payload);
      if (post) {
        post.shares++;
      }
    },

    commentAdded: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.comments.push(comment);
      }
    },

    postDeleted: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
});

export const { postAdded, postLiked, postUnliked, postShared, commentAdded, postDeleted } = postSlice.actions;
export default postSlice.reducer;
export const selectAllposts = (state) => {
  return state.posts.posts;
};