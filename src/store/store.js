import userReducer from "./userSlice.js";
import chatHistoryReducer from "./chatHistorySlice.js";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    chatHistory: chatHistoryReducer,
  },
});

export default store;
