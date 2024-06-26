'use client';

import React, { useEffect, useState } from 'react';
import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';
import { Icon } from '@/utils/icons';
import EditVenueModal from './EditVenueModal';
import BaseButton from '@/components/BaseButton/BaseButton';
import { API_URL } from '@/utils/api/api';
import Loader from '@/components/Loader/Loader';

/**
 * MyVenuesDisplay component for displaying and managing a user's venues.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.profile - The profile data containing the user's venues.
 * @returns {JSX.Element} - The rendered component.
 */
const MyVenuesDisplay = ({ profile }) => {
  const [venues, setVenues] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentVenue, setCurrentVenue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bookingsPerPage = 3;

  /**
   * Fetch bookings for a specific venue with retries.
   * @param {string} venueId - The ID of the venue.
   * @param {number} [retries=3] - The number of retries in case of failure.
   * @returns {Promise<Array>} - The bookings for the venue.
   */
  const fetchBookingsForVenue = async (venueId, retries = 3) => {
    try {
      const response = await fetch(
        `${API_URL}/holidaze/venues/${venueId}?_bookings=true`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'X-Noroff-API-Key': localStorage.getItem('apiKey'),
          },
        }
      );

      if (!response.ok) {
        if (retries > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return await fetchBookingsForVenue(venueId, retries - 1);
        } else {
          throw new Error(`Failed to fetch bookings for venue ${venueId}`);
        }
      }

      const data = await response.json();
      return data.data.bookings || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  /**
   * Fetch bookings for all venues in the profile.
   */
  const fetchBookings = async () => {
    setLoading(true);
    setError(null);

    if (profile && profile.venues) {
      try {
        const updatedVenues = await Promise.all(
          profile.venues.map(async (venue) => {
            const bookings = await fetchBookingsForVenue(venue.id);
            return { ...venue, bookings };
          })
        );
        setVenues(updatedVenues);
      } catch (error) {
        setError('Failed to fetch bookings for some venues.');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [profile]);

  /**
   * Open the edit modal for a specific venue.
   * @param {Object} venue - The venue to edit.
   */
  const openEditModal = (venue) => {
    document.body.classList.add('body-lock');
    setCurrentVenue(venue);
    setEditModalVisible(true);
  };

  /**
   * Handle the closure of the edit modal.
   */
  const handleModalClose = () => {
    document.body.classList.remove('body-lock');
    setEditModalVisible(false);
    setCurrentVenue(null);
  };

  /**
   * Handle the completion of saving a venue.
   * @param {Object} updatedVenueData - The updated venue data.
   */
  const handleSaveComplete = (updatedVenueData) => {
    setVenues((prevVenues) =>
      prevVenues.map((venue) =>
        venue.id === updatedVenueData.id
          ? { ...venue, ...updatedVenueData }
          : venue
      )
    );
    handleModalClose();
  };

  /**
   * Handle the completion of deleting a venue.
   * @param {string} venueId - The ID of the venue to delete.
   */
  const handleDeleteComplete = (venueId) => {
    const filteredVenues = venues.filter((venue) => venue.id !== venueId);
    setVenues(filteredVenues);
    handleModalClose();
  };

  const totalBookings = venues.reduce(
    (total, venue) => total + (venue.bookings ? venue.bookings.length : 0),
    0
  );
  const totalPages = Math.ceil(totalBookings / bookingsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!venues.length) {
    return (
      <p className="-p-4 mx-4 my-6 rounded p-10 text-center shadow-lg">
        You have no venues
      </p>
    );
  }

  return (
    <div className="mx-4 flex flex-col">
      <h2 className="my-4">My Venues</h2>
      {venues.map((venue, index) => {
        const bookings = venue.bookings || [];
        const startIndex = (currentPage - 1) * bookingsPerPage;
        const endIndex = startIndex + bookingsPerPage;
        const currentBookings = bookings.slice(startIndex, endIndex);

        return (
          <div key={index} className="my-4 flex flex-col rounded p-2 shadow-md">
            <div className="relative">
              <ImageCarousel
                images={
                  venue.media || [
                    {
                      url: '/default-post-image.jpg',
                      alt: 'Default Venue Image',
                    },
                  ]
                }
              />
              <button
                onClick={() => openEditModal(venue)}
                className="absolute right-4 top-4 rounded bg-light p-2 shadow-lg hover:bg-creme sm:right-8"
              >
                <Icon name="pencil" className="text-4xl text-primary" />
              </button>
            </div>
            <div className="border-lightBlueGrey p-4">
              <h3 className="break-words">{venue.name}</h3>
              <p>Price: {venue.price}</p>
              <p>Max Guests: {venue.maxGuests}</p>
              <p>
                Offering:{' '}
                {(venue.meta &&
                  Object.entries(venue.meta)
                    .filter(([_key, value]) => value)
                    .map(([key]) => key.replace(/_/g, ' '))
                    .join(', ')) ||
                  'This place has no special offers'}
              </p>
              <div className="my-2 rounded border border-lightBlueGrey bg-creme p-4 shadow-inner">
                <h2 className="mb-2">Bookings</h2>
                {currentBookings.length > 0 ? (
                  <ul>
                    {currentBookings.map((booking) => (
                      <li key={booking.id}>
                        <div className="flex flex-col">
                          <div className="my-2">
                            Dates:{' '}
                            {new Date(booking.dateFrom).toLocaleDateString()} -{' '}
                            {new Date(booking.dateTo).toLocaleDateString()}
                          </div>
                          <div>Guests: {booking.guests}</div>
                          <div>Booked by: {booking.customer.name}</div>
                        </div>
                        <hr className="my-2" />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No bookings for this venue.</p>
                )}
                {bookings.length > bookingsPerPage && (
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
              <div className="text-end">
                <BaseButton
                  href={{
                    pathname: `/venue/${venue.id}`,
                    query: { from: 'profile', profileName: profile.name },
                  }}
                >
                  View
                </BaseButton>
              </div>
            </div>
          </div>
        );
      })}
      {editModalVisible && currentVenue && (
        <EditVenueModal
          venue={currentVenue}
          onClose={handleModalClose}
          onSaveComplete={handleSaveComplete}
          onDeleteComplete={handleDeleteComplete}
        />
      )}
    </div>
  );
};

export default MyVenuesDisplay;
