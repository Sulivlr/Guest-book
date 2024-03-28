import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMessageAsync } from '../store/messageSlice';
import { Button, Card, CardContent, TextField } from '@mui/material';

const MessageForm: React.FC = () => {
  const dispatch = useDispatch();
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createMessageAsync({ author, content, image }));
    setAuthor('');
    setContent('');
    setImage(null);
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Author (Optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
            margin="normal"
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-input"
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
          <label htmlFor="image-input">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MessageForm;