'use client';
import React, { useEffect, useState } from 'react';
import VenueCard from '../VenueCard/VenueCard';
import { fetchVenues } from '@/utils/api/api';
import SearchComponent from '../Search/Search';
import DateFilter from '../Filters/DateFilter';
import MaxGuestsFilter from '../Filters/MaxGuestsFilter';
import { API_URL } from '@/utils/api/api';

const GetVenues = () => {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [maxGuests, setMaxGuests] = useState(1);

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

  useEffect(() => {
    filterVenues();
  }, [searchTerm, startDate, endDate, maxGuests, venues]);

  const handleSearchChange = async (term) => {
    setSearchTerm(term);
  };

  const handleDateChange = async (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleGuestsChange = async (count) => {
    setMaxGuests(count);
  };

  const filterVenues = async () => {
    let filtered = venues;

    if (searchTerm.trim() !== '') {
      try {
        const response = await fetch(
          `${API_URL}/holidaze/venues/search?q=${searchTerm}&_bookings=true`
        );
        const data = await response.json();
        filtered = data.data;
        console.log(filtered);
      } catch (error) {
        console.error('Error searching venues', error);
        filtered = [];
      }
    }

    if (startDate && endDate) {
      filtered = filtered.filter((venue) => {
        if (venue.bookings && venue.bookings.length > 0) {
          const isBooked = venue.bookings.some((booking) => {
            const bookingStart = new Date(booking.dateFrom);
            const bookingEnd = new Date(booking.dateTo);
            return startDate <= bookingEnd && endDate >= bookingStart;
          });
          return !isBooked;
        }
        return true;
      });
    }

    if (maxGuests) {
      filtered = filtered.filter((venue) => venue.maxGuests >= maxGuests);
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
      <MaxGuestsFilter onGuestsChange={handleGuestsChange} />
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
