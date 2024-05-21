'use client';
import React, { useState } from 'react';
import MaxGuestsFilter from '../MaxGuestsFilter';
import MetaFilter from '../MetaFilter';
import { Icon } from '@/utils/icons';
import BaseButton from '@/components/BaseButton/BaseButton';

const FilterDropdown = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [meta, setMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleGuestsChange = (count) => {
    setGuestCount(count);
    onFilterChange({ guestCount: count, meta });
  };

  const handleMetaChange = (updatedMeta) => {
    setMeta(updatedMeta);
    onFilterChange({ guestCount, meta: updatedMeta });
  };

  const resetFilters = () => {
    const resetMeta = {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    };
    setGuestCount(1);
    setMeta(resetMeta);
    onFilterChange({ guestCount: 1, meta: resetMeta });
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center">
        <button
          onClick={toggleDropdown}
          className="inline-flex w-full justify-between rounded-md border border-grey bg-light px-4 py-2 text-sm font-medium text-blue shadow-sm hover:bg-lightBlueGrey focus:outline-none focus:ring-2 focus:ring-lightGreen focus:ring-offset-2"
        >
          {isOpen ? 'Close filter' : 'Open filter'}
          <Icon name="filter" className="ml-2 text-xl text-primary" />
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-40 mt-2 rounded-md border border-grey bg-light p-4 shadow-lg">
          <MaxGuestsFilter
            onGuestsChange={handleGuestsChange}
            guestCount={guestCount}
          />
          <MetaFilter onMetaChange={handleMetaChange} meta={meta} />
          <BaseButton onClick={resetFilters} className="mt-4">
            Reset Filters
          </BaseButton>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
