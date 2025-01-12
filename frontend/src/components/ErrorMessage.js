import React from 'react';
import { Alert, Box } from '@mui/material';

const ErrorMessage = ({ message }) => {
  return (
    <Box sx={{ my: 2 }}>
      <Alert severity="error">{message}</Alert>
    </Box>
  );
};

export default ErrorMessage; 