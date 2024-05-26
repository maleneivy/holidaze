'use client';

import { useEffect, useState } from 'react';
import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';
import OffersDisplay from '@/components/OffersDisplay/OffersDisplay';
import BookingCalendar from '@/components/Booking/BookingCalendar';
import BookingForm from '@/components/Booking/BookingForm';
import { formatDate } from '@/utils/date';
import { useAuth } from '../lib/authProvider';
import { API_URL } from '@/utils/api/api';
import BookingConfirmation from '@/components/Booking/BookingConfirmation';
import BaseButton from '@/components/BaseButton/BaseButton';

/**
 * SpecificVenueDisplay component for displaying detailed information about a specific venue.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.images - The images related to the venue.
 * @param {Object} props.venue - The venue data.
 * @returns {JSX.Element} - The rendered component.
 */
const SpecificVenueDisplay = ({ images, venue }) => {
  const { auth } = useAuth();
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3;
  const isOwner = auth.userName === venue.owner.name;

  /**
   * Fetch the latest bookings for the venue.
   */
  const fetchLatestBookings = async () => {
    try {
      const response = await fetch(
        `${API_URL}/holidaze/venues/${venue.id}?_bookings=true&_customer=true`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
            'X-Noroff-API-Key': auth.apiKey,
          },
          cache: 'no-store',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const updatedVenue = await response.json();
      setBookings(updatedVenue.data.bookings || []);
    } catch (error) {
      console.error('Failed to fetch latest bookings:', error);
    }
  };

  useEffect(() => {
    fetchLatestBookings();
  }, []);

  /**
   * Handle date changes in the booking calendar.
   * @param {Array} dates - The selected dates.
   */
  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };

  /**
   * Handle booking submission.
   * @param {number} guests - The number of guests.
   */
  const handleBookingSubmit = async (guests) => {
    const [startDate, endDate] = selectedDates;

    if (!startDate || !endDate) {
      alert('Please select valid dates.');
      return;
    }

    const requestBody = {
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests: Number(guests),
      venueId: venue.id,
    };

    const response = await fetch(`${API_URL}/holidaze/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
        'X-Noroff-API-Key': auth.apiKey,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      await fetchLatestBookings();
      setShowConfirmation(true);
    } else {
      const errorResponse = await response.json();
      console.error('Failed to book:', errorResponse);
      alert('Failed to book. Please try again.');
    }
  };

  /**
   * Handle closing the booking confirmation modal.
   */
  const handleCloseConfirmation = async () => {
    setShowConfirmation(false);
    await fetchLatestBookings();
  };

  /**
   * Sort bookings and ensure dateFrom is before dateTo.
   * @param {Array} bookings - The bookings to sort.
   * @returns {Array} - The sorted bookings.
   */
  const getSortedBookings = (bookings) => {
    return bookings
      .map((booking) => {
        if (new Date(booking.dateFrom) > new Date(booking.dateTo)) {
          const temp = booking.dateFrom;
          booking.dateFrom = booking.dateTo;
          booking.dateTo = temp;
        }
        return booking;
      })
      .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
  };

  /**
   * Calculate the total price for a booking.
   * @param {string} dateFrom - The start date of the booking.
   * @param {string} dateTo - The end date of the booking.
   * @param {number} pricePerNight - The price per night of the venue.
   * @returns {number} - The total price for the booking.
   */
  const calculateTotalPrice = (dateFrom, dateTo, pricePerNight) => {
    const startDate = new Date(dateFrom);
    const endDate = new Date(dateTo);
    const timeDiff = endDate - startDate;
    const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    return numberOfNights * pricePerNight;
  };

  const totalBookings = getSortedBookings(bookings).length;
  const totalPages = Math.ceil(totalBookings / bookingsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * bookingsPerPage;
  const endIndex = startIndex + bookingsPerPage;
  const currentBookings = getSortedBookings(bookings).slice(
    startIndex,
    endIndex
  );

  const horizontalLineStyles = `my-4`;

  return (
    <>
      {showConfirmation && (
        <BookingConfirmation onClose={handleCloseConfirmation} />
      )}
      <div className="md:hidden">
        <ImageCarousel images={images} screenSize="default" />
      </div>
      {images.length > 1 && (
        <div className="hidden gap-2 md:grid md:grid-cols-2 lg:grid-cols-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.alt || `Image ${index + 1}`}
              className="h-48 w-full object-cover"
              onError={(e) => (e.target.src = '/default-post-image.jpg')}
            />
          ))}
        </div>
      )}
      {images.length === 1 && (
        <div className="hidden md:block">
          <ImageCarousel images={images} screenSize="desktop" />
        </div>
      )}
      <div className="mx-8 mt-8 sm:mx-10">
        <div>
          <h1 className="max-h-10 overflow-hidden truncate text-base font-bold">
            {venue.name}
          </h1>
        </div>
        <div>
          <p className="break-words">
            Country:{' '}
            {venue.location.country
              ? venue.location.country
              : 'No country provided'}
          </p>
          <p className="break-words">
            City:{' '}
            {venue.location.city ? venue.location.city : 'No city provided'}
          </p>
          <p>Max guests: {venue.maxGuests}</p>
          <p>Owner: {venue.owner.name}</p>
          <p>Price: {venue.price} per night</p>
        </div>
        <hr className={horizontalLineStyles} />
        <OffersDisplay offers={venue.meta} />
        <hr className={horizontalLineStyles} />
        <div className="my-2">
          <h2>Description</h2>
          {venue.description.length > 0 ? (
            <p className="break-words">{venue.description}</p>
          ) : (
            <p>There are no description provided for this venue.</p>
          )}
        </div>
        <hr className={horizontalLineStyles} />
        <div className="my-2">
          <h2 className="mb-2">Calendar</h2>
          <BookingCalendar
            bookings={bookings}
            onDateChange={handleDateChange}
          />
          {auth.token && !isOwner ? (
            <BookingForm
              onBookingSubmit={handleBookingSubmit}
              maxGuests={venue.maxGuests}
              pricePerNight={venue.price}
              selectedDates={selectedDates}
            />
          ) : isOwner ? (
            <div className="my-2 rounded border border-lightBlueGrey bg-creme p-4 shadow-inner">
              <h3 className="mt-4">Bookings</h3>
              {currentBookings.length > 0 ? (
                <ul>
                  {currentBookings.map((booking) => (
                    <li key={booking.id}>
                      <p>
                        Dates: {new Date(booking.dateFrom).toLocaleDateString()}{' '}
                        - {new Date(booking.dateTo).toLocaleDateString()}
                      </p>
                      <p>Guests: {booking.guests}</p>
                      <p>Booked by: {booking.customer.name}</p>
                      <p>
                        Total Price:{' '}
                        {calculateTotalPrice(
                          booking.dateFrom,
                          booking.dateTo,
                          venue.price
                        )}{' '}
                        NOK
                      </p>
                      <hr className="my-2" />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No bookings yet.</p>
              )}
              {totalPages > 1 && (
                <div className="mt-2 flex items-center justify-between">
                  <BaseButton
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </BaseButton>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <BaseButton
                    type="button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </BaseButton>
                </div>
              )}
            </div>
          ) : (
            <p>Please log in to make a booking.</p>
          )}
        </div>
        <hr className={horizontalLineStyles} />
        <div className="my-2">
          <h2>Location</h2>
          {venue.location.address ? (
            <p className="break-words">{venue.location.address}</p>
          ) : (
            <p>No address provided</p>
          )}
          {venue.location.city ? (
            <p className="break-words">{venue.location.city}</p>
          ) : (
            <p>No city provided</p>
          )}
        </div>
        <div>
          <p>Created: {formatDate(venue.created)}</p>
          <p>Last updated: {formatDate(venue.updated)}</p>
        </div>
      </div>
    </>
  );
};

export default SpecificVenueDisplay;
