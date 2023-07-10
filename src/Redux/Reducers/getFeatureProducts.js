
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: null,
  message: "",
  products:[],

};

const getFeatureProducts = createSlice({
  name: "Get Features Products No filters",
  initialState,
  reducers: {
  
    getFeatureProductsRequestSuccess: (state, action) => {
      state.success = action.payload.success;
      state.products = action.payload.product;
    },
    getFeatureProductsRequestFail: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default getFeatureProducts.reducer;

export const {
    getFeatureProductsRequestSuccess,
    getFeatureProductsRequestFail,
} = getFeatureProducts.actions;
