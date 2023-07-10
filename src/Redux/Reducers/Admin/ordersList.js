import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOrder_Admin_Success: null,
  message: "",
  totalAmount: 0,
  Orders: [],
};

const AllOrderList = createSlice({
  name: "All Products",
  initialState,
  reducers: {
    allOrder_Admin_initialize: (state) => {
      state.allOrder_Admin_Success = null;
      state.message = "";
      state.totalAmount = 0;
      state.Orders = [];
    },

    allOrder_Admin_RequestSuccess: (state, action) => {
      state.allOrder_Admin_Success = action.payload.success;
      state.Orders = action.payload.orders;
      state.totalAmount = action.payload.totalAmount;
    },
    allOrder_Admin_RequestFail: (state, action) => {
      state.allOrder_Admin_Success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default AllOrderList.reducer;

export const {
  allOrder_Admin_initialize,
  allOrder_Admin_RequestSuccess,
  allOrder_Admin_RequestFail,
} = AllOrderList.actions;
