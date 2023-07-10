import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUser_Admin_Success: null,
  message: "",

  Users: [],
};

const AllUserList = createSlice({
  name: "All User",
  initialState,
  reducers: {
    allUser_Admin_initiated: (state, action) => {
      state.allUser_Admin_Success = null;
      state.message = "";
      state.Users = [];
    },
    allUser_Admin_RequestSuccess: (state, action) => {
      state.allUser_Admin_Success = action.payload.success;
      state.Users = action.payload.user;
    },
    allUser_Admin_RequestFail: (state, action) => {
      state.allUser_Admin_Success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default AllUserList.reducer;

export const {allUser_Admin_initiated, allUser_Admin_RequestSuccess, allUser_Admin_RequestFail } =
  AllUserList.actions;
