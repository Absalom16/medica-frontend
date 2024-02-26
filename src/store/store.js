import userReducer from "./userSlice";
import chatHistoryReducer from "./chatHistorySlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    chatHistory: chatHistoryReducer,
  },
});

export default store;
