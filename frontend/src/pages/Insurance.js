import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Box,
  Paper
} from '@mui/material';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import api from '../services/api';

const Insurance = () => {
  const [insurances, setInsurances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchInsurances();
  }, []);

  const fetchInsurances = async () => {
    setLoading(true);
    try {
      const response = await api.getInsurances();
      setInsurances(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch insurance plans');
      console.error('Error fetching insurances:', err);
    }
    setLoading(false);
  };

  const handleBuyInsurance = async (insuranceId) => {
    if (!userId) {
      setError('Please enter your user ID');
      return;
    }

    setLoading(true);
    try {
      await api.buyInsurance({
        user_id: userId,
        insurance_id: insuranceId,
        quantity: 1
      });
      setError('');
      // Show success message or redirect to confirmation page
    } catch (err) {
      setError('Failed to purchase insurance');
      console.error('Error buying insurance:', err);
    }
    setLoading(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Insurance Plans
      </Typography>

      {error && <ErrorMessage message={error} />}

      <Box sx={{ mb: 4 }}>
        <TextField
          label="Your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          variant="outlined"
          size="small"
        />
      </Box>

      <Grid container spacing={3}>
        {insurances.map((insurance) => (
          <Grid item xs={12} sm={6} md={4} key={insurance.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {insurance.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Policy Price: ₹{insurance.insurance_policy_price}
                </Typography>
                <Typography variant="body2">
                  {insurance.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => handleBuyInsurance(insurance.id)}
                  disabled={!userId || loading}
                >
                  Buy Now
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Insurance; 