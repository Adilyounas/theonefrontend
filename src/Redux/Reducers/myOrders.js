import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myOrdersSuccess: null,
    message:"",
  myOrders:[]
};

const MyOrders = createSlice({
  name: "myOrders",
  initialState,
  reducers: {
    

    myOrdersRequestSuccess: (state, action) => {
      state.myOrdersSuccess = action.payload.success;
      state.myOrders = action.payload.orders;
    },
    myOrdersRequestFail: (state, action) => {
      state.myOrdersSuccess = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default MyOrders.reducer;

export const {myOrdersRequestSuccess,myOrdersRequestFail } = MyOrders.actions;
