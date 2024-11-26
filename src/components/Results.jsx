import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import BookCard from '../pages/BookCard';

const Results = ({ results }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    aToZ: false,
    zToA: false,
    mostRecent: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterOpen && filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterOpen]);

  const handleSort = () => {
    let sortedResults = [...results];
    if (filters.aToZ) {
      sortedResults.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (filters.zToA) {
      sortedResults.sort((a, b) => b.title.localeCompare(a.title));
    }
    if (filters.mostRecent) {
      sortedResults.sort((a, b) => b.first_publish_year - a.first_publish_year);
    }
    return sortedResults;
  };

  const handleFilterChange = (filter) => {
    const newFilters = { ...filters };
    newFilters[filter] = !newFilters[filter];
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      aToZ: false,
      zToA: false,
      mostRecent: false,
    });
  };

  const toggleFilterPanel = () => setFilterOpen(!filterOpen);

  const handlePagination = (direction) => {
    if (direction === 'next' && currentPage < Math.ceil(results.length / resultsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Slice the results based on the current page
  const paginatedResults = handleSort().slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={toggleFilterPanel}
          className="p-2 bg-blue-600 text-white rounded-md flex items-center transition-colors duration-300 hover:bg-blue-700"
        >
          <FaFilter className="mr-2" /> Filter
        </button>
        <button
          onClick={clearFilters}
          className="ml-4 p-2 bg-red-600 text-white rounded-md flex items-center transition-colors duration-300 hover:bg-red-700"
        >
          Clear Filters
        </button>
      </div>

      {filterOpen && (
        <div
          ref={filterRef}
          className="bg-white shadow-lg p-6 rounded-md space-y-4 absolute z-10 w-full max-w-sm mt-96"
        >
          <button
            onClick={() => setFilterOpen(false)}
            className="absolute top-2 right-2 text-black"
          >
            <FaTimes size={20} />
          </button>

          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="aToZ"
              checked={filters.aToZ}
              onChange={() => handleFilterChange('aToZ')}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor="aToZ" className="text-sm">A-Z</label>

            <input
              type="checkbox"
              id="zToA"
              checked={filters.zToA}
              onChange={() => handleFilterChange('zToA')}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor="zToA" className="text-sm">Z-A</label>
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="mostRecent"
              checked={filters.mostRecent}
              onChange={() => handleFilterChange('mostRecent')}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor="mostRecent" className="text-sm">Most Recent</label>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedResults.length === 0 ? (
          Array(6).fill().map((_, index) => (
            <Skeleton key={index} height={150} />
          ))
        ) : (
          paginatedResults.map((book, index) => (
            <BookCard key={index} book={book} />
          ))
        )}
      </div>

      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => handlePagination('prev')}
          disabled={currentPage === 1}
          className="p-2 rounded-full transition-colors duration-300 text-gray-600 hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaArrowLeft size={24} />
        </button>

        <span className="text-purple-600 font-bold text-lg">
          Page {currentPage} of {Math.ceil(results.length / resultsPerPage)}
        </span>

        <button
          onClick={() => handlePagination('next')}
          disabled={currentPage === Math.ceil(results.length / resultsPerPage)}
          className="p-2 rounded-full transition-colors duration-300 text-gray-600 hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Results;
