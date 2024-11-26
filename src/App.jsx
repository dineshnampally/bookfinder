import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './pages/Layout';
import BookDetails from './pages/BookDetails';
import Favorites from './components/Favorites';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
};

export default App;
