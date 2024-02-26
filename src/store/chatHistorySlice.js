import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChats: [],
};

const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState: initialState,
  reducers: {
    saveCurrentChats(state, action) {
      state.currentChats = action.payload;
    },
  },
});

export const { saveCurrentChats } = chatHistorySlice.actions;

export default chatHistorySlice.reducer;
