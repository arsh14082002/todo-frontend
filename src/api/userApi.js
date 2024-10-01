import axiosInstance from './axiosInstance';

// User signup
export const userSignup = (userData) => axiosInstance.post('/user/signup', userData);

// User signin
export const userSignin = (userData) => axiosInstance.post('/user/signin', userData);
