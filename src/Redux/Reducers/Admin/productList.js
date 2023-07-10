import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProduct_Admin_Success: null,
  message: "",
 
  products:[],

};

const AllProductList = createSlice({
  name: "All Products",
  initialState,
  reducers: {

    allProducts_Admin_initializing: (state, action) => {
      state.allProduct_Admin_Success = null;
      state.message = "";

      state.products = [];

    },
    allProducts_Admin_RequestSuccess: (state, action) => {
      state.allProduct_Admin_Success = action.payload.success;
      state.products = action.payload.products;
    },
    allProducts_Admin_RequestFail: (state, action) => {
      state.allProduct_Admin_Success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default AllProductList.reducer;

export const {
  allProducts_Admin_initializing,
    allProducts_Admin_RequestSuccess,
    allProducts_Admin_RequestFail,
} = AllProductList.actions;
