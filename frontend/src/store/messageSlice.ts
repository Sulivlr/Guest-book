import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Message } from '../types';

const backendURL = 'http://localhost:8000';

export const fetchMessagesAsync = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const response = await axios.get<Message[]>(`${backendURL}/messages`);
    return response.data;
  }
);

export const createMessageAsync = createAsyncThunk(
  'messages/createMessage',
  async (message: Message) => {
    const response = await axios.post<Message>(`${backendURL}/messages`, message);
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
      .addCase(fetchMessagesAsync.fulfilled, (state, action: PayloadAction<Message[]>) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(fetchMessagesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch messages';
      })
      .addCase(createMessageAsync.fulfilled, (state, action: PayloadAction<Message>) => {
        state.messages.push(action.payload);
      });
  },
});

export default messagesSlice.reducer;
