import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from '../assets/ad-3.png'

const RegisterPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://book-db-l6yl.onrender.com/users', { fullName, email, password });
      navigate('/login');
    } catch (err) {
      setError('Error registering user');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-purple-200 px-4 sm:px-8 relative">
      <div className="absolute inset-0 bg-[url('/path/to/background-pattern.svg')] opacity-20 pointer-events-none"></div>
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
        <div className="flex justify-center mb-6">
          <img 
            src={img} 
            alt="BookFinder" 
            className="h-36 w-36 sm:h-32 sm:w-32 drop-shadow-lg animate-pulse" 
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-700 mb-2 tracking-wider">Welcome to BookFinder</h1>
        <p className="text-center text-gray-700 mb-6">Your journey to knowledge starts here. Dive into a world of books.</p>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm hover:shadow-md transition"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm hover:shadow-md transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm hover:shadow-md transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-500 transition-transform transform hover:scale-105 shadow-lg"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 font-semibold hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
