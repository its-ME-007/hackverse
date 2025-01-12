import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = {
  // Medicines
  getMedicines: () => axios.get(`${API_URL}/medicines`),
  searchMedicines: (query) => axios.get(`${API_URL}/medicines/search?query=${query}`),
  
  // Appointments
  getAppointments: () => axios.get(`${API_URL}/appointments`),
  createAppointment: (data) => axios.post(`${API_URL}/appointments`, data),
  
  // Insurance
  getInsurances: () => axios.get(`${API_URL}/insurance`),
  buyInsurance: (data) => axios.post(`${API_URL}/insurance/buy`, data),
  
  // Chat
  sendMessage: (query) => axios.post(`${API_URL}/chat`, { query }),
};

export default api; 