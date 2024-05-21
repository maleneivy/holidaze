import { Icon } from '@/utils/icons';
import React, { useState } from 'react';

const MaxGuestsFilter = ({ onGuestsChange }) => {
  const [guestCount, setGuestCount] = useState(1);

  const handleIncrement = () => {
    const newCount = guestCount + 1;
    setGuestCount(newCount);
    onGuestsChange(newCount);
  };

  const handleDecrement = () => {
    const newCount = Math.max(1, guestCount - 1);
    setGuestCount(newCount);
    onGuestsChange(newCount);
  };

  return (
    <div className="flex">
      <button
        onClick={handleDecrement}
        className="rounded bg-light p-2 shadow hover:bg-yellow-100 active:bg-creme active:shadow-inner"
      >
        <Icon name="minus" className="text-xl text-primary" />
      </button>
      <span className="mx-2 rounded px-4 py-2 shadow-inner">
        {guestCount} guests
      </span>
      <button
        onClick={handleIncrement}
        className="rounded bg-light p-2 shadow hover:bg-yellow-100 active:bg-creme active:shadow-inner"
      >
        <Icon name="plus" className="text-xl text-primary" />
      </button>
    </div>
  );
};

export default MaxGuestsFilter;
