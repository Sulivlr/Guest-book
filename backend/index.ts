import express from 'express';
import cors from 'cors'
import messagesRouter from './routes/messages';


const app = express();
const port = 8000;


app.use('/messages', messagesRouter);
app.use(cors());
app.use(express.json())

app.listen(port, () => {
    console.log(`Server is started on ${port} port!`);
})