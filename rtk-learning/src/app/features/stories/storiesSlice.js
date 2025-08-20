import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stories: [
    {
      id: 1,
      userId: 2,
      username: "johndoe",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      hasUnseen: true,
    },
    {
      id: 2,
      userId: 3,
      username: "janedoe",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      hasUnseen: true,
    },
    {
      id: 3,
      userId: 4,
      username: "alexsmith",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      hasUnseen: false,
    },
    {
      id: 4,
      userId: 5,
      username: "emilyjones",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      hasUnseen: true,
    },
    {
      id: 5,
      userId: 6,
      username: "mikeross",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      hasUnseen: false,
    },
  ],
};

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    storyviewd: (state, action) => {
      const story = state.stories.find((story) => story.id === action.payload);
      if (story) {
        story.hasUnseen = false;
      }
    },
  },
});

export const { storyviewd } = storiesSlice.actions;
export default storiesSlice.reducer;
export const selectAllstories = (state) => state.stories.stories;
