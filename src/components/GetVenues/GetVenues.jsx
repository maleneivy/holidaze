'use client';

import { fetchVenues } from '@/utils/api/api';
import { useEffect, useState } from 'react';
import VenueCard from '../VenueCard/VenueCard';
import SearchComponent from '../Search/Search';

const GetVenues = () => {
  const [venues, setVenues] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const getVenues = async () => {
      try {
        const data = await fetchVenues();
        const sortedVenues = data.data.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );
        setVenues(sortedVenues);
      } catch (error) {
        console.error('Error fetching venues', error);
      }
    };

    getVenues();
  }, []);

  const handleSearchResults = (results) => {
    const sortedResults = results.sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
    setSearchResults(sortedResults);
    setIsSearching(true);
  };

  const handleSearchClear = () => {
    setSearchResults([]);
    setIsSearching(false);
  };

  const resultsToShow = isSearching
    ? searchResults.length > 0
      ? searchResults
      : []
    : venues;

  return (
    <div>
      <SearchComponent
        onSearchResults={handleSearchResults}
        onSearchClear={handleSearchClear}
      />
      <div className="my-4 flex flex-wrap justify-center gap-4 px-5">
        {resultsToShow.length > 0 ? (
          resultsToShow.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))
        ) : (
          <div className="w-full text-center">No results</div>
        )}
      </div>
    </div>
  );
};

export default GetVenues;
