import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { fetchMessagesAsync } from "../store/messageSlice";
import { CircularProgress, Card, CardContent, Typography } from '@mui/material';

const MessageList: React.FC = () => {
  const dispatch = useDispatch();
  const { messages, status, error } = useSelector((state: RootState) => state.messages);

  useEffect(() => {
    dispatch(fetchMessagesAsync());
  }, [dispatch]);

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  return (
    <div>
      {messages.map((message) => (
        <Card key={message.id} style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="subtitle1">{message.author || 'Anonymous'}</Typography>
            <Typography variant="body1">{message.content}</Typography>
            {message.image && <img src={message.image} alt="Message Image" style={{ maxWidth: '100%' }} />}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MessageList;