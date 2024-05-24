'use client';
import React from 'react';
import BaseButton from '../BaseButton/BaseButton';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-white p-6 shadow-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <BaseButton onClick={onCancel}>Cancel</BaseButton>
          <button
            onClick={onConfirm}
            className="rounded bg-lightRed px-4 py-1 text-darkBlue hover:bg-red hover:text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
