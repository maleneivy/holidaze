'use client';
import React, { useEffect, useState } from 'react';
import VenueCard from '../VenueCard/VenueCard';
import { fetchVenues } from '@/utils/api/api';
import SearchComponent from '../Search/Search';
import DateFilter from '../Filters/DateFilter';
import { API_URL } from '@/utils/api/api';

const GetVenues = () => {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const getVenues = async () => {
      try {
        const data = await fetchVenues();
        setVenues(data.data);
        setFilteredVenues(data.data);
      } catch (error) {
        console.error('Error fetching venues', error);
      }
    };

    getVenues();
  }, []);

  const handleSearchChange = async (term) => {
    setSearchTerm(term);
    await filterVenues(term, startDate, endDate);
  };

  const handleDateChange = async (start, end) => {
    setStartDate(start);
    setEndDate(end);
    await filterVenues(searchTerm, start, end);
  };

  const filterVenues = async (search, start, end) => {
    let filtered = venues;

    if (typeof search === 'string' && search.trim() !== '') {
      try {
        const response = await fetch(
          `${API_URL}/holidaze/venues/search?q=${search}&_bookings=true`
        );
        const data = await response.json();
        filtered = data.data;
      } catch (error) {
        console.error('Error searching venues', error);
        filtered = [];
      }
    }

    if (start && end) {
      filtered = filtered.filter((venue) => {
        if (!venue.bookings || venue.bookings.length === 0) {
          return true;
        }
        return venue.bookings.every((booking) => {
          const bookingStart = new Date(booking.dateFrom);
          const bookingEnd = new Date(booking.dateTo);
          return end < bookingStart || start > bookingEnd;
        });
      });
    }

    setFilteredVenues(filtered);
  };

  return (
    <div>
      <SearchComponent
        onSearchResults={handleSearchChange}
        onSearchClear={() => handleSearchChange('')}
      />
      <DateFilter onDateChange={handleDateChange} />
      <div className="my-4 flex flex-wrap justify-center gap-4 px-5">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default GetVenues;
