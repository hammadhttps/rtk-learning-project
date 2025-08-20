import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  postAdded: {
    reducers: {
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
              name: "Current User",
              username: "currUser786",
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

    commentAdded: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.comments.push(comment);
      }
    },
  },
});

export const { postAdded, postLiked, commentAdded } = postSlice.actions;
export default postSlice.reducer;
export const selectAllposts = (state) => {
  return state.posts.posts;
};
