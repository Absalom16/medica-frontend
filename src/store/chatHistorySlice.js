import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChats: [],
  historyChats: [],
};

const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState: initialState,
  reducers: {
    saveCurrentChats(state, action) {
      state.currentChats = action.payload;
    },
    clearChatHistory(state) {
      state.currentChats = [];
    },
    saveHistoryChat(state, action) {
      state.historyChats = JSON.parse(action.payload.chats);
    },
    deleteHistoryChat(state) {
      state.historyChats = [];
    },
  },
});

export const {
  saveCurrentChats,
  clearChatHistory,
  saveHistoryChat,
  deleteHistoryChat,
} = chatHistorySlice.actions;

export default chatHistorySlice.reducer;
