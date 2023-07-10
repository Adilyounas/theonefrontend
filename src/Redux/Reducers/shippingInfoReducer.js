import { createSlice } from "@reduxjs/toolkit";
let localStorageInitialState = JSON.parse(localStorage.getItem("shippingInfo"));




let initialState = {
  shippingInfo:localStorage.getItem("shippingInfo")? localStorageInitialState: {},
};

const ShippingInfo = createSlice({
  name: "updatePassword",
  initialState,
  reducers: {
    shippingInfoRequest: (state, action) => {
      state.shippingInfo = action.payload;
    },
  },
});

export default ShippingInfo.reducer;

export const { shippingInfoRequest } = ShippingInfo.actions;
