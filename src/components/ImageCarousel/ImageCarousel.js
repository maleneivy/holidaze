"use client"

import { useState } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const index = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  const imageUrl = images[currentIndex].url ? images[currentIndex].url : '/default-post-image.jpg';

  return (
    <div className="relative w-full max-w-sm">
      <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">Prev</button>
      <div className="overflow-hidden relative w-full h-60">
        <img
          src={imageUrl}
          alt={images[currentIndex].alt || `Slide ${currentIndex + 1}`}
          className="object-cover w-full h-full"
          onError={(e) => e.target.src = '/default-post-image.jpg'}
        />
      </div>
      <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">Next</button>
    </div>
  );
};

export default ImageCarousel;

