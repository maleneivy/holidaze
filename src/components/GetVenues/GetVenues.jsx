'use client';
import React, { useEffect, useState } from 'react';
import VenueCard from '../VenueCard/VenueCard';
import { fetchVenues } from '@/utils/api/api';
import SearchComponent from '../Search/Search';
import DateFilter from '../Filters/DateFilter';
import FilterDropdown from '../Filters/dropdown/FilterDropdown';
import { API_URL } from '@/utils/api/api';
import Loader from '../Loader/Loader';
import BaseButton from '../BaseButton/BaseButton';

const GetVenues = () => {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [visibleVenues, setVisibleVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [maxGuests, setMaxGuests] = useState(1);
  const [meta, setMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });
  const [loading, setLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(10);

  useEffect(() => {
    const getVenues = async () => {
      try {
        const data = await fetchVenues();
        setVenues(data.data);
        setFilteredVenues(data.data);
        setVisibleVenues(data.data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching venues', error);
      } finally {
        setLoading(false);
      }
    };

    getVenues();
  }, []);

  useEffect(() => {
    filterVenues();
  }, [searchTerm, startDate, endDate, maxGuests, meta, venues]);

  const handleSearchChange = async (term) => {
    setSearchTerm(term);
  };

  const handleDateChange = async (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleFilterChange = (filters) => {
    setMaxGuests(filters.guestCount);
    setMeta(filters.meta);
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

    if (meta.wifi) {
      filtered = filtered.filter((venue) => venue.meta.wifi);
    }
    if (meta.parking) {
      filtered = filtered.filter((venue) => venue.meta.parking);
    }
    if (meta.breakfast) {
      filtered = filtered.filter((venue) => venue.meta.breakfast);
    }
    if (meta.pets) {
      filtered = filtered.filter((venue) => venue.meta.pets);
    }

    setFilteredVenues(filtered);
    setVisibleVenues(filtered.slice(0, itemsToShow));
  };

  const loadMoreVenues = () => {
    setLoadMoreLoading(true);
    setTimeout(() => {
      setItemsToShow((prev) => prev + 10);
      setVisibleVenues(filteredVenues.slice(0, itemsToShow + 10));
      setLoadMoreLoading(false);
    }, 1000);
  };

  return (
    <div>
      <div className="mx-auto my-10 flex max-w-96 flex-col gap-4">
        <h1>Find your next Holidaze home</h1>
        <SearchComponent
          onSearchResults={handleSearchChange}
          onSearchClear={() => handleSearchChange('')}
        />
        <DateFilter onDateChange={handleDateChange} />
        <FilterDropdown onFilterChange={handleFilterChange} />
      </div>
      <div className="my-4 flex flex-wrap justify-center gap-4 px-5">
        {loading ? (
          <Loader />
        ) : visibleVenues.length > 0 ? (
          <>
            {visibleVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </>
        ) : (
          <p>No results found.</p>
        )}
      </div>
      {visibleVenues.length < filteredVenues.length && (
        <div className="my-4 mb-20 flex justify-center">
          <BaseButton onClick={loadMoreVenues} disabled={loadMoreLoading}>
            {loadMoreLoading ? 'Loading...' : 'Load More'}
          </BaseButton>
        </div>
      )}
    </div>
  );
};

export default GetVenues;
