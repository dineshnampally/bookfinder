import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-center py-4 text-sm">
        Created by{' '}
        <a
          href="https://github.com/dineshnampally"
          className="text-purple-500 hover:text-purple-700 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dinesh Nampally
        </a>
      </footer>
    </div>
  );
};

export default Layout;
