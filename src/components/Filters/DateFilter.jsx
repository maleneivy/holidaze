import { Icon } from '@/utils/icons';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateFilter = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onDateChange(start, end);

    if (start && end) {
      setIsOpen(false);
    }
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString() : '';
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center">
        <button
          onClick={toggleCalendar}
          className="inline-flex w-full justify-between rounded-md border border-grey bg-light px-4 py-2 text-sm font-medium text-blue shadow-lg hover:border-lightGreen focus:outline-none focus:ring-2 focus:ring-lightGreen focus:ring-offset-2"
        >
          {startDate && endDate
            ? `${formatDate(startDate)} - ${formatDate(endDate)}`
            : 'Choose Dates'}
          <Icon name="calendar" className="ml-2 text-xl text-primary" />
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 z-40 mt-2 w-full rounded-md border border-grey bg-light shadow-lg">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            monthsShown={window.innerWidth >= 768 ? 2 : 1}
            calendarContainer={({ children }) => <div>{children}</div>}
          />
        </div>
      )}
    </div>
  );
};

export default DateFilter;
