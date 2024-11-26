import React from 'react';

const Favorites = ({ favorites, removeFavorite, onClose }) => {
  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-800"
      >
        &times;
      </button>

      <h2 className="text-3xl font-bold mb-6">Your Favorite Books</h2>

      <div className="overflow-y-auto max-h-[70vh]">
        {favorites.length > 0 ? (
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}
          >
            {favorites.map((book) => (
              <div
                key={book.key}
                className="border p-4 rounded-lg flex flex-col justify-between h-[350px] w-[250px] shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                  alt={book.title}
                  className="w-full h-[200px] object-cover mb-4 rounded-md"
                />
                <div>
                  <h3 className="font-semibold truncate">{book.title}</h3>
                  <p className="text-gray-700 truncate">
                    {book.author_name ? book.author_name[0] : 'Unknown'}
                  </p>
                </div>
                <button
                  onClick={() => removeFavorite(book.key)}
                  className="mt-4 bg-red-500 text-white p-2 rounded-md"
                >
                  Remove from Favorites
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg">No favorite books yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
