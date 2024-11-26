import React, { useState } from 'react';
import BookDetails from './BookDetails'; 
const BookCard = ({ book }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleViewDetails = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <>
      {/* Card Component */}
      <div className="border border-gray-300 rounded-lg overflow-hidden relative transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
        {/* Book Cover */}
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
          alt={book.title}
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          {/* Book Title, Author, Year, Genre */}
          <h3 className="text-xl font-semibold">{book.title}</h3>
          <p className="text-gray-600">
            by {book.author_name ? book.author_name[0] : 'Unknown'}
          </p>
          <p className="text-gray-500">{book.first_publish_year}</p>
          <p className="text-gray-400">
            {book.subject ? book.subject[0] : 'Genre Unknown'}
          </p>

          <button
            onClick={handleViewDetails}
            className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md transition-colors duration-300 hover:bg-blue-700"
          >
            View Details
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 relative"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <BookDetails book={book} onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;
