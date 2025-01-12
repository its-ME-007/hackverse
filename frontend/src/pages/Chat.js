import React, { useState } from 'react';
import { Container, TextField, Button, Paper, Typography, Box } from '@mui/material';
import api from '../services/api';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.sendMessage(message);
      setResponse(data.answer);
    } catch (error) {
      console.error('Error sending message:', error);
      setResponse('Error: Could not get response from the server');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Chat with Pharmacist
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </Box>
        {response && (
          <Paper sx={{ mt: 3, p: 2, bgcolor: 'grey.100' }}>
            <Typography variant="body1">{response}</Typography>
          </Paper>
        )}
      </Paper>
    </Container>
  );
};

export default Chat; 