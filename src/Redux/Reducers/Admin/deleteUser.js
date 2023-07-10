import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deleteUser_Success: null,
    message:"",
};

const DeleteUser = createSlice({
  name: "Delete User",
  initialState,
  reducers: {
    

    deleteUser_Admin_RequestSuccess: (state, action) => {
      state.deleteUser_Success = action.payload.success;
      state.message = action.payload.message;
    },
    deleteUser_Admin_RequestFail: (state, action) => {
        state.deleteUser_Success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export default DeleteUser.reducer;

export const {deleteUser_Admin_RequestSuccess,deleteUser_Admin_RequestFail } = DeleteUser.actions;
