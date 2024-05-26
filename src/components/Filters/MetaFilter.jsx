'use client';

import React, { useState, useEffect } from 'react';
import { Icon } from '@/utils/icons';

const MetaFilter = ({ onMetaChange, meta }) => {
  const [currentMeta, setCurrentMeta] = useState(meta);

  useEffect(() => {
    setCurrentMeta(meta);
  }, [meta]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedMeta = { ...currentMeta, [name]: checked };
    setCurrentMeta(updatedMeta);
    onMetaChange(updatedMeta);
  };

  const metaMap = {
    wifi: {
      label: 'Wifi',
      icon: <Icon name="wifi" className="text-lg text-primary" />,
    },
    parking: {
      label: 'Parking',
      icon: <Icon name="parking" className="text-lg text-primary" />,
    },
    pets: {
      label: 'Pets allowed',
      icon: <Icon name="pets" className="text-lg text-primary" />,
    },
    breakfast: {
      label: 'Breakfast included',
      icon: <Icon name="breakfast" className="text-lg text-primary" />,
    },
  };

  return (
    <div className="mt-4 flex flex-col space-y-2">
      {Object.keys(currentMeta).map((key) => (
        <label key={key} className="flex items-center space-x-3">
          <input
            type="checkbox"
            name={key}
            checked={currentMeta[key]}
            onChange={handleCheckboxChange}
            className="size-5"
          />
          {metaMap[key] && metaMap[key].icon}
          <span className="text-lg">
            {metaMap[key]
              ? metaMap[key].label
              : key.charAt(0).toUpperCase() + key.slice(1)}
          </span>
        </label>
      ))}
    </div>
  );
};

export default MetaFilter;
