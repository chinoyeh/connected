import { createSlice } from '@reduxjs/toolkit';

const followersSlice = createSlice({
  name: 'followers',
  initialState: [],
  reducers: {
    setfollowers: (state, action) => {
      const newFollowers = action.payload;
      return newFollowers;
    },
    addfollowers: (state, action) => {
      const newFollowers = action.payload;
      return [...state, ...newFollowers];
    },
  },
});

export const { setFollowers, addFollowers } = followersSlice.actions;
export default followersSlice.reducer;