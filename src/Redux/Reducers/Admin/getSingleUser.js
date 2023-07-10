import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    singleUserSuccess_admin: null,
    message:"",
  singleUser:{}
};

const SingleUser = createSlice({
  name: "Single User",
  initialState,
  reducers: {
    

    singleUser_Admin_RequestSuccess: (state, action) => {
      state.singleUserSuccess_admin = action.payload.success;
      state.singleUser = action.payload.user;
    },
    singleUser_Admin_RequestFail: (state, action) => {
      state.singleUserSuccess_admin = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default SingleUser.reducer;

export const {singleUser_Admin_RequestSuccess,singleUser_Admin_RequestFail } = SingleUser.actions;
