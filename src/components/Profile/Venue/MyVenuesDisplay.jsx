import React, { useEffect, useState } from 'react';
import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';
import { Icon } from '@/utils/icons';
import EditVenueModal from './EditVenueModal';
import BaseButton from '@/components/BaseButton/BaseButton';

const MyVenuesDisplay = ({ profile }) => {
  const [venues, setVenues] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentVenue, setCurrentVenue] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (profile && profile.venues) {
        const bookingsResponse = await fetch(
          'https://v2.api.noroff.dev/holidaze/bookings',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'X-Noroff-API-Key': localStorage.getItem('apiKey'),
            },
          }
        );
        const bookingsData = await bookingsResponse.json();
        const bookings = bookingsData.data;

        const updatedVenues = profile.venues.map((venue) => ({
          ...venue,
          bookings: bookings.filter((booking) => booking.venueId === venue.id),
        }));

        setVenues(updatedVenues);
      }
    };

    fetchBookings();
  }, [profile]);

  const openEditModal = (venue) => {
    setCurrentVenue(venue);
    setEditModalVisible(true);
  };

  const handleModalClose = () => {
    setEditModalVisible(false);
    setCurrentVenue(null);
  };

  const handleSaveComplete = (updatedVenueData) => {
    const updatedVenues = venues.map((venue) =>
      venue.id === updatedVenueData.id ? updatedVenueData : venue
    );
    setVenues(updatedVenues);
  };

  const handleDeleteComplete = (venueId) => {
    console.log('Deleting venue with ID:', venueId);
    const filteredVenues = venues.filter((venue) => venue.id !== venueId);
    setVenues(filteredVenues);
    handleModalClose();
  };

  if (!venues.length) {
    return <p>You have no venues</p>;
  }

  return (
    <div className="mx-4 flex flex-col">
      <h2 className="my-4">My Venues (Venue Manager)</h2>
      {venues.map((venue, index) => (
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
            <h3>{venue.name}</h3>
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
              <h2>Bookings</h2>
              {venue.bookings && venue.bookings.length > 0 ? (
                <ul>
                  {venue.bookings.map((booking) => (
                    <li key={booking.id}>
                      From: {booking.dateFrom} - To: {booking.dateTo} | Guests:{' '}
                      {booking.guests}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No bookings for this venue.</p>
              )}
            </div>
            <div className="text-end">
              <BaseButton href={`/venue/${venue.id}`}>View</BaseButton>
            </div>
          </div>
        </div>
      ))}
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
