import express from 'express';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  res.send('Bye Sultan')
});

messagesRouter.post('/', async (req, res) => {
  res.send('Hello Sultan')
});

export default messagesRouter;