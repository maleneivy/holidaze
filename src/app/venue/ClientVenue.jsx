'use client';

import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';

const ClientVenue = ({ images, venue }) => {
  console.log(venue);
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
        <div>
          <h1 className="font-bold">{venue.name}</h1>
        </div>
        <div>
          <p>
            {venue.location.country}, {venue.location.city}
          </p>
          <p>Max guests: {venue.maxGuests}</p>
          <p>Owner: {venue.owner.name}</p>
        </div>
        <div>
          <h2>Offers</h2>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default ClientVenue;
