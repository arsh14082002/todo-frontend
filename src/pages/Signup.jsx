import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userSignup } from '../api/userApi'; // Adjust the path as needed

const Signup = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userSignup({ fullname, email, password });
      // Store token in local storage
      localStorage.setItem('token', response.data.token);
      // Redirect to a protected route (e.g., /todos)
      navigate('/todos');
    } catch (error) {
      // Handle errors (e.g., display a message)
      setError(error.response?.data?.message || 'Error signing up');
    }
  };

  return (
    <div className="h-screen w-full flex justify-center  items-center flex-col bg-slate-700">
      <div className="bg-slate-500 p-6">
        <h1 className="text-2xl font-bold">Signup</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
          <div className="flex flex-col ">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              className="bg-transparent border rounded-sm p-1"
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              className="bg-transparent border rounded-sm p-1"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              className="bg-transparent border rounded-sm p-1"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <p>
              I have already an account{' '}
              <Link to={'/signin'} className="underline text-white">
                singin
              </Link>
            </p>
          </div>
          <button type="submit" className="bg-black text-white p-2">
            Signup
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
