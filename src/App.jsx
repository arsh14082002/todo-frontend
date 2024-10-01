import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import TodoList from './pages/TodoList';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/signin"
          element={
            isAuthenticated ? (
              <Navigate to="/todos" replace={true} />
            ) : (
              <Signin onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/todos" replace={true} />
            ) : (
              <Signup onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        <Route path="/todos" element={isAuthenticated ? <TodoList /> : <Navigate to="/signin" />} />

        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />

        <Route path="/" element={<Navigate to="/todos" />} />
      </Routes>
    </Router>
  );
};

export default App;
