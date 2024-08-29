// mailSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSentMailsAction,
  fetchReceivedMailsAction,
  getReceivedMailDetailsAction,
  getSentMailDetailsAction,
  deleteMailAction,
  sendMailAction,
} from './mailActions';

const initialState = {
  sentMails: [],
  receivedMails: [],
  selectedMail: null,
  loading: false,
  error: null,
  sendMailSuccess: false,
};

const mailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    clearSelectedMail(state) {
      state.selectedMail = null;
    },
    resetSendMailSuccess(state) {
      state.sendMailSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch sent emails
      .addCase(fetchSentMailsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSentMailsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.sentMails = action.payload;
      })
      .addCase(fetchSentMailsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch received emails
      .addCase(fetchReceivedMailsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReceivedMailsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.receivedMails = action.payload;
      })
      .addCase(fetchReceivedMailsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get received email details
      .addCase(getReceivedMailDetailsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReceivedMailDetailsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMail = action.payload;
      })
      .addCase(getReceivedMailDetailsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get sent email details
      .addCase(getSentMailDetailsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSentMailDetailsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMail = action.payload;
      })
      .addCase(getSentMailDetailsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete email
      .addCase(deleteMailAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMailAction.fulfilled, (state, action) => {
        state.loading = false;
        state.sentMails = state.sentMails.filter(
          (email) => email.id !== action.meta.arg
        );
        state.receivedMails = state.receivedMails.filter(
          (email) => email.id !== action.meta.arg
        );
      })
      .addCase(deleteMailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send email
      .addCase(sendMailAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.sendMailSuccess = false;
      })
      .addCase(sendMailAction.fulfilled, (state) => {
        state.loading = false;
        state.sendMailSuccess = true;
      })
      .addCase(sendMailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedMail, resetSendMailSuccess } = mailSlice.actions;

export default mailSlice.reducer;
