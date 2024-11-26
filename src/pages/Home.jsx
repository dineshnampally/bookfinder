import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import Gallery from '../components/Gallery';
import axios from 'axios';

const Home = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?title=${searchQuery}`);
      setBooks(response.data.docs);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Hero />

      
      <div className="text-center my-4">
        <SearchBar onSearch={fetchBooks} />
      </div>

      <Gallery books={books} loading={loading} />
    </div>
  );
};

export default Home;
