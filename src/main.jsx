import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Import global styles and Tailwind CSS
import App from './App';  // Import the main App component
import { BrowserRouter as Router } from 'react-router-dom';  // Import Router for routing

// Create the root for the React app and render it
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <App />
  </Router>
);
