import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userSignin } from '../api/userApi'; // Adjust the path as needed

const Signin = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userSignin({ emailOrUsername, password });
      // Store token in local storage
      localStorage.setItem('token', response.data.token);
      // Redirect to a protected route (e.g., /todos)
      navigate('/todos');
    } catch (error) {
      // Handle errors (e.g., display a message)
      setError(error.response?.data?.message || 'Error signing in');
    }
  };

  return (
    <div className="h-screen w-full flex justify-center  items-center flex-col bg-slate-700">
      <div className="bg-slate-500 p-6">
        <h1 className="text-2xl font-bold">Signin</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
          <div className="flex flex-col ">
            <label htmlFor="emailOrUsername">Email or Username</label>
            <input
              type="text"
              id="emailOrUsername"
              value={emailOrUsername}
              placeholder="Email or Username"
              className="bg-transparent border rounded-sm p-1 outline-none"
              onChange={(e) => setEmailOrUsername(e.target.value)} // Corrected this line
              required
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              className="bg-transparent border rounded-sm p-1 outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <p>
              I have no account{' '}
              <Link to={'/signup'} className="underline text-white">
                Singup
              </Link>
            </p>
          </div>
          <button type="submit" className="bg-black text-white p-2">
            Signin
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signin;
