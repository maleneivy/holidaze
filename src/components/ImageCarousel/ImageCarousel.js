"use client"

import { Icon } from '@/utils/icons';
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

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const imageUrl = images[currentIndex]?.url ? images[currentIndex].url : '/default-post-image.jpg';

  return (
    <div className="relative w-full max-w-sm">
      {images.length > 1 && (
        <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
          <Icon name="prev" className="w-9 h-9 text-light hover:w-11 hover:h-11" />
        </button>
      )}
      <div className="overflow-hidden relative w-full h-60">
        <img
          src={imageUrl}
          alt={images[currentIndex]?.alt || `Slide ${currentIndex + 1}`}
          className="object-cover w-full h-full"
          onError={(e) => e.target.src = '/default-post-image.jpg'}
        />
        {images.length > 1 && (
          <div className="absolute bottom-2 w-full flex justify-center space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                onClick={() => goToSlide(index)}
                className={`cursor-pointer w-3 h-3 rounded-full ${currentIndex === index ? 'w-4 h-4 bg-blue' : 'bg-lightBlueGrey'}`}
              />
            ))}
          </div>
        )}
      </div>
      {images.length > 1 && (
        <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
          <Icon name="next" className="w-9 h-9 text-light hover:w-11 hover:h-11" />
        </button>
      )}
    </div>
  );
};

export default ImageCarousel;



