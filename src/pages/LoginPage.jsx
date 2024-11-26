import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from '../assets/ad-3.png'

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://book-db-l6yl.onrender.com/users');
      const user = response.data.find((u) => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('authToken', user.id);
        navigate('/home');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Error logging in');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black px-4 sm:px-8">
      <div className="w-full max-w-md bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={img} alt="BookFinder" className="h-24 w-24 sm:h-32 sm:w-32" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-yellow-400 mb-2">Welcome Back to BookFinder</h1>
        <p className="text-center text-gray-400 mb-6">Log in to access your account.</p>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <a href="/register" className="text-yellow-400 font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
