import { createSlice } from "@reduxjs/toolkit";

//initial state

const initialState = {
  authDetails: {
    username: "",
    email: "",
    token: "",
    refreshToken: "",
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
    setNewAccessToken(state, action) {
      state.authDetails.token = action.payload;
      console.log(state.authDetails);
    },
  },
});

export const {
  setSignUpDetails,
  setLoginDetails,
  setAuthDetails,
  setNewAccessToken,
} = userSlice.actions;

export default userSlice.reducer;
