import { createAsyncThunk } from '@reduxjs/toolkit';
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
  async (message: Message) => {
    const response = await axios.post<Message>(`${backendURL}/messages`, message);
    return response.data;
  }
);

export const createMessage = createAsyncThunk<void, Message>(
  'createMessage',
  async (message) => {
    const formData = new FormData();

    formData.append('author', message.author)
    formData.append('content', message.content)

    if(message.image) {
      formData.append('image', message.image)
    }
    await axios.post(`${backendURL}/messages`, formData);
  }
)
