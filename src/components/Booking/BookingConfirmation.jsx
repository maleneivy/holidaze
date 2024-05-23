import React from 'react';

const BookingConfirmation = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-darkBlue bg-opacity-50">
      <div className="rounded-lg bg-light p-6 shadow-lg">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="mb-4 text-2xl font-semibold">Booking confirmed!</h2>
          <button onClick={onClose} className="text-blue underline">
            Close window
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
