import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generalLoading: true,
};

const generalLoading = createSlice({
  name: "loading",
  initialState,
  reducers: {
    GeneralLoadingTrue: (state) => {
      state.generalLoading = true;

    },
    GeneralLoadingFalse: (state) => {
      state.generalLoading = false;

    },
  },
});

export default generalLoading.reducer;

export const { GeneralLoadingTrue, GeneralLoadingFalse } =
generalLoading.actions;
