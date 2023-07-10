import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: null,
  message: "",
};

const updatePassword = createSlice({
  name: "updatePassword",
  initialState,
  reducers: {
    updatePasswordResetStates: (state) => {
      state.success = null;
      state.message = "";
    },

    updatePasswordRequestSuccess: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    updatePasswordRequestFail: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default updatePassword.reducer;

export const { updatePasswordResetStates, updatePasswordRequestSuccess, updatePasswordRequestFail } =
  updatePassword.actions;
