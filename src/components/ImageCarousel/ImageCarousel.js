'use client';

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

  const imageUrl = images[currentIndex]?.url
    ? images[currentIndex].url
    : '/default-post-image.jpg';

  return (
    <div className="relative w-full max-w-sm">
      {images.length > 1 && (
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 transform"
        >
          <Icon
            name="prev"
            className="h-9 w-9 text-light hover:h-11 hover:w-11"
          />
        </button>
      )}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={images[currentIndex]?.alt || `Slide ${currentIndex + 1}`}
          className="h-full w-full object-cover"
          onError={(e) => (e.target.src = '/default-post-image.jpg')}
        />
        {images.length > 1 && (
          <div className="absolute bottom-2 flex w-full justify-center space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 cursor-pointer rounded-full ${currentIndex === index ? 'h-4 w-4 bg-blue' : 'bg-lightBlueGrey'}`}
              />
            ))}
          </div>
        )}
      </div>
      {images.length > 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 transform"
        >
          <Icon
            name="next"
            className="h-9 w-9 text-light hover:h-11 hover:w-11"
          />
        </button>
      )}
    </div>
  );
};

export default ImageCarousel;
