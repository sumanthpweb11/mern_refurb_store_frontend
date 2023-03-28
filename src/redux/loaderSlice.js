import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loaders",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoader } = loaderSlice.actions;
