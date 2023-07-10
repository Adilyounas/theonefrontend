import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewsSuccess: null,
  message: "",
  reviews: [],
};

const Reviews = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    reviewsRequestInitiated: (state) => {
      state.reviewsSuccess = null;
      state.message = "";
      state.reviews = [];
    },
    reviewsRequestSuccess: (state, action) => {
      state.reviewsSuccess = action.payload.success;
      state.reviews = action.payload.reviews;
    },
    reviewsRequestFail: (state, action) => {
      state.reviewsSuccess = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default Reviews.reducer;

export const {reviewsRequestInitiated, reviewsRequestSuccess, reviewsRequestFail } = Reviews.actions;
