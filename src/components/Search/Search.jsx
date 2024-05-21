'use client';
import React, { useState } from 'react';
import { API_URL } from '@/utils/api/api';

const SearchComponent = ({ onSearchResults, onSearchClear }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (query.trim() !== '') {
      try {
        const response = await fetch(
          `${API_URL}/holidaze/venues/search?q=${query}`
        );
        const data = await response.json();
        console.log(data);
        onSearchResults(query);
      } catch (error) {
        console.error('Error searching venues', error);
        onSearchResults('');
      }
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
