import express from 'express';
import cors from 'cors'
import messagesRouter from './routes/messages';
import fileDb from './fileDb';


const app = express();
const port = 8000;

app.use(cors());
app.use('/messages', messagesRouter);
app.use(express.json())

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

void run();

