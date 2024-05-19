import React, { useEffect, useState } from 'react';
import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';
import { Icon } from '@/utils/icons';

const MyVenuesDisplay = ({ profile }) => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (profile.venues) {
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

  if (!venues.length) {
    return <p>You have no venues</p>;
  }

  return (
    <div className="mx-4 flex flex-col">
      <h2 className="my-4">My Venues (Venue Manager)</h2>
      <div>
        {venues.map((venue, index) => (
          <div key={index} className="my-4 flex flex-col rounded p-2 shadow-md">
            <div className="relative">
              <ImageCarousel
                images={
                  venue.media || [
                    {
                      url: '/default-venue-image.jpg',
                      alt: 'Default Venue Image',
                    },
                  ]
                }
              />
              <button className="hover:bg-creme absolute right-4 top-4 rounded bg-light p-2 shadow-lg sm:right-8">
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
              <div className="bg-creme my-2 rounded border border-lightBlueGrey p-4 shadow-inner">
                <h2>Bookings</h2>
                {venue.bookings && venue.bookings.length > 0 ? (
                  <ul>
                    {venue.bookings.map((booking) => (
                      <li key={booking.id}>
                        From: {booking.dateFrom} - To: {booking.dateTo} |
                        Guests: {booking.guests}
                      </li>
                    ))}
                    <hr />
                  </ul>
                ) : (
                  <p>No bookings for this venue.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVenuesDisplay;
