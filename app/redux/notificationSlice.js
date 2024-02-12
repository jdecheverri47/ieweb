'use client'
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: false,
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
});

export const { setSuccess } = notificationSlice.actions;
export default notificationSlice.reducer;