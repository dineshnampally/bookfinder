import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import Results from './Results';
import CircularLoader from './loading/CircularLoader';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('title');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleSearch = async () => {
    if (!searchQuery) {
      alert('Please enter a search term!');
      return;
    }

    setLoading(true);
    setResults([]);
    setError(null);
    setProgress(0);

    try {
      let searchURL = `https://openlibrary.org/search.json?${searchCategory}=${searchQuery}`;
      if (searchCategory === 'genre') {
        searchURL = `https://openlibrary.org/search.json?subject=${searchQuery}`;
      }

      
      setProgress(30); // Initial progress
      const response = await axios.get(searchURL);
      setProgress(70); 

      if (response.data.docs.length === 0) {
        setError('No results found');
        setProgress(100); 
      } else {
        setResults(response.data.docs);
        setProgress(100); 
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('An error occurred while fetching the data');
      setProgress(100); 
    } finally {
      setTimeout(() => setLoading(false), 500); 
    }
  };

  return (
    <div className="flex flex-col items-center p-8 rounded-lg w-full max-w-4xl mx-auto">
      <div className="w-full mb-6 relative">
        <div className="flex items-center rounded-full overflow-hidden border border-gray-300">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-4 px-6 text-xl rounded-l-full focus:outline-none bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            aria-label="Search for books by title, author, or genre"
            disabled={loading}
          />
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="p-4 bg-transparent text-lg focus:outline-none"
            aria-label="Select search category"
            disabled={loading}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="genre">Genre</option>
          </select>
          <button
            onClick={handleSearch}
            className="p-4 bg-blue-600 text-white hover:bg-blue-700 rounded-r-full"
            aria-label="Search"
            disabled={loading}
          >
            <FaSearch className="text-2xl" />
          </button>
        </div>
      </div>

      {loading && <CircularLoader progress={progress} isComplete={progress === 100} />}
      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
      {!loading && results.length > 0 && <Results results={results} />}
    </div>
  );
};

export default SearchBar;
