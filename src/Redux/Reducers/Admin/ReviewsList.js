import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allReviews_Admin_Success: null,
  message: "",

  reviews: [],
};

const AllReviews = createSlice({
  name: "All Reviews",
  initialState,
  reducers: {
    allReviews_Admin_RequestSuccess: (state, action) => {
      state.allReviews_Admin_Success = action.payload.success;
      state.reviews = action.payload.reviews;
    },
    allReviews_Admin_RequestFail: (state, action) => {
      state.allReviews_Admin_Success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default AllReviews.reducer;

export const { allReviews_Admin_RequestSuccess, allReviews_Admin_RequestFail } =
  AllReviews.actions;
