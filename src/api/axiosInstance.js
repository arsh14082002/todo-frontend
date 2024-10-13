import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://todo-app-backend1-gv0p.onrender.com/api/v1', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
