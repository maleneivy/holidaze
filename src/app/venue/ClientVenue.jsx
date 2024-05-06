'use client';

import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';
import OffersDisplay from '@/components/OffersDisplay/OffersDisplay';
import { formatDate } from '@/utils/date';

const ClientVenue = ({ images, venue }) => {
  console.log(venue);
  console.log(venue.meta);
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
        <OffersDisplay offers={venue.meta} />
        <div>
          <h2 className="font-bold">Description</h2>
          {venue.description.length > 0 ? (
            <p>{venue.description}</p>
          ) : (
            <p>There are no description provided for this venue.</p>
          )}
        </div>
        <div>
          <h2 className="font-bold">Calendar</h2>
        </div>
        <div>
          <h2 className="font-bold">Location</h2>
          {venue.location.address ? (
            <p>{venue.location.address}</p>
          ) : (
            <p>No address provided</p>
          )}
          {venue.location.city ? (
            <p>{venue.location.city}</p>
          ) : (
            <p>No city provided</p>
          )}
        </div>
        <div>
          <p>Created: {formatDate(venue.created)}</p>
          <p>Last updated: {formatDate(venue.updated)}</p>
        </div>
      </div>
    </>
  );
};

export default ClientVenue;
