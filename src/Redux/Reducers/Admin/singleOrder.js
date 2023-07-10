import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    singleOrderSuccess: null,
    message:"",
  singleOrder:{}
};

const SingleOrderAdmin = createSlice({
  name: "Order",
  initialState,
  reducers: {
    

    singleOrder_Admin_RequestSuccess: (state, action) => {
      state.singleOrderSuccess = action.payload.success;
      state.singleOrder = action.payload.order;
    },
    singleOrder_Admin_RequestFail: (state, action) => {
      state.singleOrderSuccess = action.payload.success;
      state.singleOrder = action.payload.message;
    },
  },
});

export default SingleOrderAdmin.reducer;

export const {singleOrder_Admin_RequestSuccess,singleOrder_Admin_RequestFail } = SingleOrderAdmin.actions;
