import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, signupApi } from "./authApi";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
        const data = await loginApi(credentials);
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Login Failed');
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try{
      if(userData.password !== userData.confirmPassword){
        return rejectWithValue('Passwords did not match.');
      }
        const data = await signupApi({name: userData.name, email: userData.email, password: userData.password});
        return data;
    } catch(err){
        return rejectWithValue(err.response?.data?.message || 'Signup Failed');
    }
  }
);
