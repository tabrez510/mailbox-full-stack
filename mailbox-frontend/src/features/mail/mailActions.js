// mailActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchSentMails,
  fetchReceivedMails,
  getReceivedMailDetails,
  getSentMailDetails,
  deleteMail,
  sendMail,
} from "./mailApi";

export const sendMailAction = createAsyncThunk(
  "mail/sendMail",
  async (emailData, { rejectWithValue }) => {
    try {
      const data = await sendMail(emailData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSentMailsAction = createAsyncThunk(
  "mail/fetchSentMails",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchSentMails();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchReceivedMailsAction = createAsyncThunk(
  "mail/fetchReceivedMails",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchReceivedMails();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getReceivedMailDetailsAction = createAsyncThunk(
  "mail/getReceivedMailDetails",
  async ({ emailId, userId }, { rejectWithValue }) => {
    try {
      const data = await getReceivedMailDetails(emailId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSentMailDetailsAction = createAsyncThunk(
  "mail/getSentMailDetails",
  async ({ emailId, userId }, { rejectWithValue }) => {
    try {
      const data = await getSentMailDetails(emailId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteMailAction = createAsyncThunk(
  "mail/deleteMail",
  async (emailId, { rejectWithValue }) => {
    try {
      const data = await deleteMail(emailId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
