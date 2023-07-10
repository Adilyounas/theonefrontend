import { createSlice } from "@reduxjs/toolkit";

const colors = JSON.parse(localStorage.getItem("colors"))

let initialState = {
  modez:false,
  bgColors: colors?colors:"",
};


const themingColors = createSlice({
  name: "themingColors",
  initialState,
  reducers: {
    setBgColors: (state, action) => {
      state.bgColors = action.payload;
    },
    setModez: (state, action) => {
      state.modez = action.payload;
    },
  },
});

export default themingColors.reducer;
export const { setModez, setBgColors } = themingColors.actions;
