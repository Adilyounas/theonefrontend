import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: null,
  message: "",
};

const resetPassword = createSlice({
  name: "updatePassword",
  initialState,
  reducers: {
    resetPasswordResetStates: (state) => {
      state.success = null;
      state.message = "";
    },

    resetPasswordRequestSuccess: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    resetPasswordRequestFail: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default resetPassword.reducer;

export const { resetPasswordResetStates, resetPasswordRequestSuccess, resetPasswordRequestFail } =
resetPassword.actions;
