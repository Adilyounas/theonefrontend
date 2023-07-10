import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deleteOrder_Success: null,
  message: "",
};

const DeleteOrder = createSlice({
  name: "Delete Order",
  initialState,
  reducers: {
    deleteOrder_Admin_RequestSuccess: (state, action) => {
      state.deleteOrder_Success = action.payload.success;
      state.message = action.payload.message;
    },
    deleteOrder_Admin_RequestFail: (state, action) => {
      state.deleteOrder_Success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default DeleteOrder.reducer;

export const {
  deleteOrder_Admin_RequestSuccess,
  deleteOrder_Admin_RequestFail,
} = DeleteOrder.actions;
