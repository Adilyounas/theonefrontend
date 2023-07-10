import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likeAndDislikeLoading: false,
  success: null,
  message: "",
};

const likeAndDislike = createSlice({
  name: "Put like and dislike",
  initialState,
  reducers: {

    likeAndDislikeRequestSuccess: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    likeAndDislikeRequestFail: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default likeAndDislike.reducer;

export const {
    likeAndDislikeRequestSuccess,
    likeAndDislikeRequestFail,
} = likeAndDislike.actions;
