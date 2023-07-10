import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deleteProduct_Success: null,
  message: "",
};

const DeleteProduct = createSlice({
  name: "Delete Product",
  initialState,
  reducers: {
    deleteProduct_Admin_RequestSuccess: (state, action) => {
      state.deleteProduct_Success = action.payload.success;
      state.message = action.payload.message;
    },
    deleteProduct_Admin_RequestFail: (state, action) => {
      state.deleteProduct_Success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default DeleteProduct.reducer;

export const {
  deleteProduct_Admin_RequestSuccess,
  deleteProduct_Admin_RequestFail,
} = DeleteProduct.actions;
