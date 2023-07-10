import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: null,
  message: "",
  product: {},
};

const SingleProduct = createSlice({
  name: "Get Single Product",
  initialState,
  reducers: {
    getSingleProductProductsRequestSuccess: (state, action) => {
      state.success = action.payload.success;
      state.product = action.payload.product;
    },
    getSingleProductProductsRequestFail: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default SingleProduct.reducer;

export const { getSingleProductProductsRequestSuccess, getSingleProductProductsRequestFail } =
  SingleProduct.actions;
