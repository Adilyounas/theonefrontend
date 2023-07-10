import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addReviewsSuccess: null,
    message:"",
};

const AddReview = createSlice({
  name: "add review",
  initialState,
  reducers: {
    

    addReviewsRequestSuccess: (state, action) => {
      state.addReviewsSuccess = action.payload.success;
      state.message = action.payload.message;

    },
    addReviewsRequestFail: (state, action) => {
      state.addReviewsSuccess = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default AddReview.reducer;

export const {addReviewsRequestSuccess,addReviewsRequestFail } = AddReview.actions;
