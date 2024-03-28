import React from 'react';
import MessageList from './MessagesList.tsx';
import MessageForm from './MessageForm.tsx';

const MessagesPage: React.FC = () => {
  return (
    <div>
      <h1>Guestbook</h1>
      <MessageForm />
      <MessageList />
    </div>
  );
};

export default MessagesPage;
