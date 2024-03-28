import express from 'express';
import fileDb from '../fileDb';
import {MessageWithoutId} from '../types';

const messagesRouter = express.Router();

messagesRouter.get('/messages', async (req, res) => {
  const messages = await fileDb.getMessages();
  return res.json(messages);
});

messagesRouter.post('/messages', async (req, res) => {
  try {
    const { author, content, image }: MessageWithoutId = req.body;

    if (!req.body.content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const newMessage = await fileDb.addMessage({ author, content, image });
    return res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error adding message:', error);
    return res.status(500).json({ error: 'Failed to add message' });
  }
});

export default messagesRouter;
