import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    bio: "Digital creator | Photography enthusiast",
    followers: 1245,
    following: 367,
  },
  isLoggedIn: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrUser = (state) => state.auth.user;
