import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: null,
  message: "",
};

const updateProfile = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {

    updateProfileRequestSuccess: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    updateProfileRequestFail: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default updateProfile.reducer;

export const {
    updateProfileRequestSuccess,
    updateProfileRequestFail,
} = updateProfile.actions;
