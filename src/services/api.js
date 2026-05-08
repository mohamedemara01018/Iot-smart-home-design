import axios from 'axios';

const defaultBaseUrl = `${window.location.protocol}//${window.location.hostname}:8000`;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultBaseUrl,
  timeout: 8000
});

// These functions are ready for the backend you built earlier.
export const smartHomeApi = {
  getTemperature: () => api.get('/api/temp'),
  getHumidity: () => api.get('/api/humidity'),
  getGas: () => api.get('/api/gas'),
  getFlame: () => api.get('/api/flame'),
  getDoor: () => api.get('/api/door'),
  getLight: () => api.get('/api/light'),
  openDoor: () => api.post('/api/opendoor'),
  closeDoor: () => api.post('/api/closedoor'),
  getLogs: () => api.get('/api/logs'),
  updateLight: (status) => api.post('/api/light', { status })
};

export default api;
