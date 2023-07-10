import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: null,
  message: "",
  totalProductsCount:0,
  filtered:0,
  resultPerPage:0,
  products:[],

};

const getProducts = createSlice({
  name: "Get Products with Filters ",
  initialState,
  reducers: {


    getProductsRequestSuccess: (state, action) => {
      state.success = action.payload.success;
      state.totalProductsCount = action.payload.totalProductsCount;
      state.filtered = action.payload.filtered;
      state.resultPerPage = action.payload.resultPerPage;
      state.products = action.payload.product;
    },
    getProductsRequestFail: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default getProducts.reducer;

export const {
    getProductsRequestSuccess,
    getProductsRequestFail,
} = getProducts.actions;
