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
    <div className="mb-4 flex flex-col items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name or description..."
        className="my-2 w-full max-w-md rounded p-2 shadow-md"
      />
    </div>
  );
};

export default SearchComponent;
