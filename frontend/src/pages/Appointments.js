import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  TextField, 
  Button,
  Box,
  Paper
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import api from '../services/api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    patient_name: '',
    datetime: new Date(),
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await api.getAppointments();
      setAppointments(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch appointments');
      console.error('Error fetching appointments:', err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.createAppointment(formData);
      setFormData({ patient_name: '', datetime: new Date() });
      fetchAppointments();
      setError('');
    } catch (err) {
      setError('Failed to book appointment');
      console.error('Error booking appointment:', err);
    }
    setLoading(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>

      {error && <ErrorMessage message={error} />}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Book an Appointment
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Patient Name"
                value={formData.patient_name}
                onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                margin="normal"
                required
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Date & Time"
                  value={formData.datetime}
                  onChange={(newValue) => setFormData({ ...formData, datetime: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
                  minDate={new Date()}
                />
              </LocalizationProvider>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={loading}
              >
                Book Appointment
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Your Appointments
          </Typography>
          {appointments.map((appointment) => (
            <Card key={appointment.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">
                  {appointment.patient_name}
                </Typography>
                <Typography color="textSecondary">
                  {new Date(appointment.datetime).toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Status: {appointment.status}
                </Typography>
              </CardContent>
            </Card>
          ))}
          {appointments.length === 0 && (
            <Typography color="textSecondary">
              No appointments scheduled
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Appointments; 