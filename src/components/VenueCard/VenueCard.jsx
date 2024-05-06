import ImageCarousel from '../ImageCarousel/ImageCarousel';

const VenueCard = ({ venue }) => {
  const defaultImage = '/default-post-image.jpg';

  const images =
    venue.media && venue.media.length > 0
      ? venue.media
      : [{ url: defaultImage, alt: 'Default Image' }];

  return (
    <div className="w-full max-w-sm rounded shadow-lg">
      <ImageCarousel images={images} />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">
          <h3 className="text-base">{venue.name}</h3>
          <p className="text-sm">Max guests: {venue.maxGuests}</p>
        </div>
      </div>
      <div className="px-6 pb-2 pt-4">
        <p className="inline-block rounded-full text-sm">
          {venue.price} NOK/night
        </p>
      </div>
    </div>
  );
};

export default VenueCard;
