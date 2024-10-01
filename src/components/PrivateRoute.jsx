// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the path as needed

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  // Ensure `isAuthenticated` is a boolean value
  if (isAuthenticated === undefined) {
    // Optional: You might want to handle the case when `isAuthenticated` is undefined
    return <p>Loading...</p>; // Or any other fallback UI
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
