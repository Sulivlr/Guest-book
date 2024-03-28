import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Message } from '../types';
import axios from 'axios';

const backendURL = 'http://localhost:8000';

export const fetchMessagesAsync = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const response = await axios.get<Message[]>(`${backendURL}/messages`);
    return response.data;
  }
);

export const postMessageAsync = createAsyncThunk(
  'messages/postMessage',
  async (formData: FormData) => {
    const response = await axios.post<Message>(`${backendURL}/messages`, formData);
    return response.data;
  }
);

interface MessagesState {
  messages: Message[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MessagesState = {
  messages: [],
  status: 'idle',
  error: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessagesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(fetchMessagesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch messages';
      })
      .addCase(postMessageAsync.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export default messagesSlice.reducer;
