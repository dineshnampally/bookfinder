import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle, FaHeart } from 'react-icons/fa';
import Favorites from './Favorites';

const Header = () => {
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('authToken');
    if (userId) {
      axios
        .get(`https://book-db-l6yl.onrender.com/users/${userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
    const storedFavorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const toggleFavoritesWindow = () => {
    setShowFavorites(!showFavorites);
  };

  const removeFavorite = (bookKey) => {
    const updatedFavorites = favorites.filter((fav) => fav.key !== bookKey);
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <header className="bg-white text-black py-4 px-6 shadow-md w-full fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-2xl font-bold hover:text-gray-500">
          Book Finder
        </Link>

        <div className="flex items-center space-x-6 relative">
          {/* Profile Icon */}
          <div
            className="relative cursor-pointer p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            <FaUserCircle className="text-2xl text-gray-800" />
            {showProfileMenu && user && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-md z-10">
                <div className="p-4 border-b">
                  <p className="font-semibold">{user.fullName}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="p-4">
                  <button
                    onClick={handleLogout}
                    className="w-full text-red-500 hover:bg-gray-100 p-2 text-left rounded-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Favorites Icon */}
          <div
            className="cursor-pointer p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={toggleFavoritesWindow}
          >
            <FaHeart className="text-2xl text-gray-800" />
          </div>
        </div>
      </div>

      {/* Favorites Modal */}
      {showFavorites && (
  <div
    className="modal-overlay fixed inset-0 bg-black bg-opacity-50 z-40"
    onClick={() => setShowFavorites(false)}
  >
    <div
      className="modal-content relative bg-white p-6 w-[90%] sm:w-[600px] lg:w-[800px] mx-auto mt-20 rounded-lg shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <Favorites
        favorites={favorites}
        removeFavorite={removeFavorite}
        onClose={() => setShowFavorites(false)}
      />
    </div>
  </div>
)}
    </header>
  );
};

export default Header;
