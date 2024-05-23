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
    <div className="flex flex-col space-y-2">
      {Object.keys(currentMeta).map((key) => (
        <label key={key} className="flex items-center">
          <input
            type="checkbox"
            name={key}
            checked={currentMeta[key]}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </label>
      ))}
    </div>
  );
};

export default MetaFilter;
