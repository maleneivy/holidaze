'use client';

import React, { useState, useEffect } from 'react';

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
          <span className="text-lg">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </span>
        </label>
      ))}
    </div>
  );
};

export default MetaFilter;
