import React, { useState, useEffect } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CardActions 
} from '@mui/material';
import api from '../services/api';

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const response = await api.getMedicines();
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.searchMedicines(searchQuery);
      setMedicines(response.data);
    } catch (error) {
      console.error('Error searching medicines:', error);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Medicines
      </Typography>
      
      <form onSubmit={handleSearch}>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={9}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              disabled={loading}
              sx={{ height: '100%' }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>

      <Grid container spacing={3}>
        {medicines.map((medicine) => (
          <Grid item xs={12} sm={6} md={4} key={medicine.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {medicine.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ₹{medicine.price}
                </Typography>
                <Typography variant="body2">
                  {medicine.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Add to Cart
                </Button>
                <Button size="small" color="primary">
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Medicines; 