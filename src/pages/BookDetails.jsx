import React, { useState, useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

const BookDetails = ({ book, onClose }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const modalRef = useRef(null);

  
  useEffect(() => {
    const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some((fav) => fav.key === book.key));
  }, [book.key]);

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  
  const handleFavorite = () => {
    const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.key !== book.key);
      sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(book);
      sessionStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
    >
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-lg w-4/5 max-w-2xl relative"
      >
       
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
          alt={book.title}
          className="w-full max-h-80 object-contain mb-4"
        />

        
        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Author:</strong> {book.author_name ? book.author_name[0] : 'Unknown'}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Year:</strong> {book.first_publish_year}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Genre:</strong> {book.subject ? book.subject[0] : 'Genre Unknown'}
        </p>
        <p className="text-gray-700 mb-4">
          {book.summary || 'No summary available.'}
        </p>

       
        <button
          onClick={handleFavorite}
          className={`p-3 rounded-md text-white font-semibold ${
            isFavorite ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
