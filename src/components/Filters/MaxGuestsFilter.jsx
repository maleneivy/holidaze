'use client';
import React, { useState, useEffect } from 'react';
import { Icon } from '@/utils/icons';

const MaxGuestsFilter = ({ onGuestsChange, guestCount }) => {
  const [count, setCount] = useState(guestCount);

  useEffect(() => {
    setCount(guestCount);
  }, [guestCount]);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onGuestsChange(newCount);
  };

  const handleDecrement = () => {
    const newCount = Math.max(1, count - 1);
    setCount(newCount);
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
        {count} guests
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
