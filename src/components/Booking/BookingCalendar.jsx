'use client';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingCalendar = ({ bookings, onDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const bookedRanges = bookings.map((booking) => ({
    start: new Date(booking.dateFrom),
    end: new Date(booking.dateTo),
  }));

  const isDateBooked = (date) => {
    return bookedRanges.some(({ start, end }) => date >= start && date <= end);
  };

  const isValidDateRange = (start, end) => {
    if (!start || !end) return true;
    return !bookedRanges.some(
      ({ start: bookedStart, end: bookedEnd }) =>
        start <= bookedEnd && end >= bookedStart
    );
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    if (isValidDateRange(start, end)) {
      setStartDate(start);
      setEndDate(end);
      if (onDateChange) {
        onDateChange(dates);
      }
    } else {
      alert('The selected date range overlaps with existing bookings.');
    }
  };

  useEffect(() => {
    setStartDate(null);
    setEndDate(null);
  }, [bookings]);

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        minDate={new Date()}
        dayClassName={(date) => (isDateBooked(date) ? 'booked' : undefined)}
      />
    </div>
  );
};

export default BookingCalendar;
