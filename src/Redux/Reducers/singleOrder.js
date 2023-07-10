import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    singleOrderSuccess: null,
    message:"",
  singleOrder:{}
};

const SingleOrder = createSlice({
  name: "Order",
  initialState,
  reducers: {
    

    singleOrderRequestSuccess: (state, action) => {
      state.singleOrderSuccess = action.payload.success;
      state.singleOrder = action.payload.order;
    },
    singleOrderRequestFail: (state, action) => {
      state.singleOrderSuccess = action.payload.success;
      state.singleOrder = action.payload.message;
    },
  },
});

export default SingleOrder.reducer;

export const {singleOrderRequestSuccess,singleOrderRequestFail } = SingleOrder.actions;
