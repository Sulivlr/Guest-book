import axios from 'axios';
import { Message } from '../types';

const backendURL = 'http://localhost:8000';

export const fetchMessages = async () => {
  const response = await axios.get<Message[]>(`${backendURL}/messages`);
  return response.data;
};

export const postMessage = async (message: Message) => {
  const formData = new FormData();
  formData.append('author', message.author);
  formData.append('content', message.content);
  if (message.image) {
    formData.append('image', message.image);
  }
  const response = await axios.post<Message>(`${backendURL}/messages`, formData);
  return response.data;
};
