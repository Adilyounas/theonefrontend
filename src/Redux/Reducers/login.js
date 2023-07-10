import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: null,
  message: "",
};

const login = createSlice({
  name: "Login",
  initialState,
  reducers: {

    LoginRequestSuccess: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    LoginRequestFail: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default login.reducer;

export const {
    LoginRequestSuccess,
    LoginRequestFail,
} = login.actions;
