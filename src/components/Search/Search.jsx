'use client';
import React, { useState } from 'react';

const SearchComponent = ({ onSearchResults, onSearchClear }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (query.trim() !== '') {
      onSearchResults(query);
    } else {
      onSearchClear();
    }
  };

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name or description..."
        className="inline-flex w-full justify-between rounded-md border border-grey bg-light px-4 py-2 text-sm font-medium text-blue shadow-lg hover:border-lightGreen focus:outline-none focus:ring-2 focus:ring-lightGreen focus:ring-offset-2"
      />
    </>
  );
};

export default SearchComponent;
