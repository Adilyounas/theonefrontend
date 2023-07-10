import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: null,
  message: "",
};

const createProduct = createSlice({
  name: "Create Product",
  initialState,
  reducers: {

    createProductRequestSuccess: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    createProductRequestFail: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default createProduct.reducer;

export const {
 
  createProductRequestSuccess,
  createProductRequestFail,
} = createProduct.actions;
