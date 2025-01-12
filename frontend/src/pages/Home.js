import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Paper,
  Avatar,
  Stack,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MedicationIcon from '@mui/icons-material/Medication';
import EventIcon from '@mui/icons-material/Event';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ChatIcon from '@mui/icons-material/Chat';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SecurityIcon from '@mui/icons-material/Security';
import PaymentsIcon from '@mui/icons-material/Payments';

const Home = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Medicines',
      description: 'Search and purchase medicines from our extensive catalog',
      icon: <MedicationIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      path: '/medicines',
      color: '#60a5fa',
    },
    {
      title: 'Appointments',
      description: 'Schedule appointments with healthcare professionals',
      icon: <EventIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      path: '/appointments',
      color: '#34d399',
    },
    {
      title: 'Insurance',
      description: 'Browse and purchase health insurance plans',
      icon: <HealthAndSafetyIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      path: '/insurance',
      color: '#fbbf24',
    },
    {
      title: 'Chat with Pharmacist',
      description: 'Get expert advice from our qualified pharmacists',
      icon: <ChatIcon sx={{ fontSize: 40, color: 'error.main' }} />,
      path: '/chat',
      color: '#f87171',
    },
  ];

  const features = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 30 }} />,
      title: 'Fast Delivery',
      description: 'Get your medicines delivered within 24 hours',
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 30 }} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service support',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 30 }} />,
      title: 'Secure Shopping',
      description: 'Your data is protected with advanced encryption',
    },
    {
      icon: <PaymentsIcon sx={{ fontSize: 30 }} />,
      title: 'Easy Payments',
      description: 'Multiple payment options available',
    },
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Regular Customer',
      content: 'MediHelp has made it so easy to get my regular medications. The delivery is always on time!',
      avatar: 'R',
    },
    {
      name: 'Priya Patel',
      role: 'Insurance Client',
      content: 'The insurance plans are comprehensive and the claims process is hassle-free.',
      avatar: 'P',
    },
    {
      name: 'Dr. Amit Kumar',
      role: 'Healthcare Professional',
      content: 'The appointment scheduling system is efficient and user-friendly. Highly recommended!',
      avatar: 'A',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Your Health, Our Priority
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 4, opacity: 0.9 }}
              >
                Access quality healthcare services from the comfort of your home
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
                onClick={() => navigate('/medicines')}
              >
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={3} key={service.title}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      bgcolor: `${service.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: 600 }}
                  >
                    {service.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate(service.path)}
                    sx={{ py: 1 }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Why Choose Us
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature) => (
              <Grid item xs={12} sm={6} md={3} key={feature.title}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    textAlign: 'center',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          What Our Users Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={4} key={testimonial.name}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <Avatar
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: 'primary.main',
                        fontSize: '1.5rem',
                      }}
                    >
                      {testimonial.avatar}
                    </Avatar>
                    <Typography variant="h6">{testimonial.name}</Typography>
                    <Typography color="text.secondary" variant="subtitle2">
                      {testimonial.role}
                    </Typography>
                    <Typography color="text.secondary">
                      "{testimonial.content}"
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md">
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography variant="h3" component="h2">
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Join thousands of satisfied customers who trust MediHelp for their healthcare needs
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
              onClick={() => navigate('/medicines')}
            >
              Explore Services
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 