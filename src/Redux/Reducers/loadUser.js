import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadUserSuccess: null,
  message: "",
  user: {},
};

const loadUser = createSlice({
  name: "Load User",
  initialState,
  reducers: {
    LoadUserInitializeStates: (state, action) => {
      state.loadUserSuccess = null;
      state.user = {};
      state.message = "";
    },

    LoadUserRequestSuccess: (state, action) => {
      state.loadUserSuccess = action.payload.success;
      state.user = action.payload.user;
    },
    LoadUserRequestFail: (state, action) => {
      state.loadUserSuccess = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default loadUser.reducer;

export const {LoadUserInitializeStates, LoadUserRequestSuccess, LoadUserRequestFail } = loadUser.actions;
