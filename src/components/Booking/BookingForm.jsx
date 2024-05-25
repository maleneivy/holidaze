import React, { useState, useEffect } from 'react';
import BaseButton from '../BaseButton/BaseButton';

const BookingForm = ({
  onBookingSubmit,
  maxGuests,
  pricePerNight,
  selectedDates,
}) => {
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedDateRange, setSelectedDateRange] = useState('');

  useEffect(() => {
    if (selectedDates[0] && selectedDates[1]) {
      const oneDay = 24 * 60 * 60 * 1000;
      const nights =
        Math.round(Math.abs((selectedDates[1] - selectedDates[0]) / oneDay)) ||
        1;
      setTotalPrice(nights * pricePerNight);
      setSelectedDateRange(
        `${formatDate(selectedDates[0])} - ${formatDate(selectedDates[1])}`
      );
    } else if (selectedDates[0]) {
      setTotalPrice(pricePerNight);
      setSelectedDateRange(
        `${formatDate(selectedDates[0])} - ${formatDate(selectedDates[0])}`
      );
    }
  }, [selectedDates, pricePerNight]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guests > maxGuests) {
      alert(
        `The number of guests cannot exceed the maximum capacity of ${maxGuests} guests.`
      );
      return;
    }
    onBookingSubmit(guests);
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString() : '';
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div>
        <label>Guests: </label>
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          min="1"
          max={maxGuests}
          className="w-full rounded border px-4 py-2 md:w-auto"
        />
      </div>
      {selectedDateRange && (
        <div>
          <p>Selected Dates: {selectedDateRange}</p>
          <p>Total Price: {totalPrice} NOK</p>
        </div>
      )}
      <BaseButton type="submit" className="mt-4">
        Book Now
      </BaseButton>
    </form>
  );
};

export default BookingForm;
