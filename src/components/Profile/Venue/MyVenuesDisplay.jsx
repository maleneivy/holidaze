import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';

const MyVenuesDisplay = ({ profile }) => {
  if (!profile || !profile.venues) {
    return <p>You have no venues</p>;
  }

  return (
    <div className="mx-4 flex flex-col">
      <h2 className="my-4">My Venues (Venue Manager)</h2>
      {profile.venues.map((venue, index) => (
        <div key={index} className="my-4 flex flex-col rounded p-2 shadow-md">
          <ImageCarousel
            images={
              venue.media || [
                { url: '/default-venue-image.jpg', alt: 'Default Venue Image' },
              ]
            }
          />
          <div className="border-lightBlueGrey p-4">
            <h3>{venue.name}</h3>
            <p>Price: {venue.price}</p>
            <p>Max Guests: {venue.maxGuests}</p>
            <p>
              Offering:{' '}
              {venue.meta &&
              Object.entries(venue.meta).filter(([_key, value]) => value)
                .length > 0
                ? Object.entries(venue.meta)
                    .filter(([_key, value]) => value)
                    .map(([key]) => key.replace(/_/g, ' '))
                    .join(', ')
                : 'This place has no special offers'}
            </p>
            <div>
              <h3>Bookings</h3>
              {profile.bookings}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyVenuesDisplay;
