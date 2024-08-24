import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./authActions";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loginStatus: "idle",
  signupStatus: "idle",
  loginError: null,
  signupError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loginStatus = "idle";
      state.signupStatus = "idle";
      state.loginError = null;
      state.signupError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "Loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "Succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "Failed";
        state.loginError = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.signupStatus = "Loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.signupStatus = "Succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.signupError = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupStatus = "Failed";
        state.signupError = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;