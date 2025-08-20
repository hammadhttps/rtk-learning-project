import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../app/features/posts/postSlice.js";
import authReducer from "../app/features/auth/authSlice.js";
import storiesReducer from "../app/features/stories/storiesSlice.js";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
    stories: storiesReducer,
  },
});
