import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: null,
  message: "",
};

const register = createSlice({
  name: "register",
  initialState,
  reducers: {

    registerRequestSuccess: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    registerRequestFail: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default register.reducer;

export const {
    registerRequestSuccess,
    registerRequestFail,
} = register.actions;
