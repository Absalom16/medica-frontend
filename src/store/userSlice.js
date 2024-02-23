import { createSlice } from "@reduxjs/toolkit";

//initial state

const initialState = {
  authDetails: {
    username: "",
    email: "",
    token: "",
    isLoggedIn: false,
  },

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
    setAuthDetails(state, action) {
      state.authDetails = action.payload;
    },
  },
});

export const { setSignUpDetails, setLoginDetails, setAuthDetails } =
  userSlice.actions;

export default userSlice.reducer;
