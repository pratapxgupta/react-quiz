import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loader",
  initialState: {
    loading: false,
  },
  reducers: {
    ShowLoader(state) {
      state.loading = true;
    },
    HideLoader(state) {
      state.loading = false;
    },
  },
});

export const { ShowLoader, HideLoader } = loadingSlice.actions;
export default loadingSlice.reducer;
