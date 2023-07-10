import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: null,
  message: "",
};

const forgotPassword = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    forgotPasswordRequestSuccess: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    forgotPasswordRequestFail: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default forgotPassword.reducer;

export const { forgotPasswordRequestSuccess, forgotPasswordRequestFail } =
  forgotPassword.actions;
