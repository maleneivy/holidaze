'use client';

import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';

const ClientVenue = ({ images, venue }) => {
  return (
    <>
      <div className="md:hidden">
        <ImageCarousel images={images} screenSize="default" />
      </div>
      {images.length > 1 && (
        <div className="hidden gap-2 md:grid md:grid-cols-2 lg:grid-cols-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.alt || `Image ${index + 1}`}
              className="h-48 w-full object-cover"
              onError={(e) => (e.target.src = '/default-post-image.jpg')}
            />
          ))}
        </div>
      )}
      {images.length === 1 && (
        <div className="hidden md:block">
          <ImageCarousel images={images} screenSize="desktop" />
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">{venue.name}</h2>
        <p>{venue.description}</p>
      </div>
    </>
  );
};

export default ClientVenue;
