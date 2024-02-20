import { createSlice } from "@reduxjs/toolkit";

//initial state

const initialState = {
  signup: {
    username: "",
    email: "",
    password: "",
  },

  login: {
    email: "",
    password: "",
  },
};

//reducer & action creators

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setSignUpDetails(state, action) {
      state.signup = action.payload;
    },
    setLoginDetails(state, action) {
      state.login = action.payload;
    },
  },
});

export const { setSignUpDetails, setLoginDetails } = userSlice.actions;

export default userSlice.reducer;
