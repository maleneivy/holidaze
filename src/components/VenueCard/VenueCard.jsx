import ImageCarousel from '../ImageCarousel/ImageCarousel';
import BaseButton from '../BaseButton/BaseButton';
import { Icon } from '@/utils/icons';

const VenueCard = ({ venue }) => {
  const defaultImage = '/default-post-image.jpg';

  const images =
    venue.media && venue.media.length > 0
      ? venue.media
      : [{ url: defaultImage, alt: 'Default Image' }];

  const metaMap = {
    wifi: {
      label: 'Wifi',
      icon: <Icon name="wifi" className="mr-2 text-lg text-primary" />,
    },
    parking: {
      label: 'Parking',
      icon: <Icon name="parking" className="mr-2 text-lg text-primary" />,
    },
    pets: {
      label: 'Pets allowed',
      icon: <Icon name="pets" className="mr-2 text-lg text-primary" />,
    },
    breakfast: {
      label: 'Breakfast included',
      icon: <Icon name="breakfast" className="mr-2 text-lg text-primary" />,
    },
  };

  const availableMeta = Object.keys(venue.meta).filter(
    (key) => venue.meta[key]
  );

  return (
    <div className="flex w-full max-w-sm flex-col justify-between rounded shadow-lg">
      <div>
        <ImageCarousel images={images} />
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">
            <h3 className="max-h-10 overflow-hidden truncate text-base">
              {venue.name}
            </h3>
            <p className="text-sm">Max guests: {venue.maxGuests}</p>
            <div>
              <ul className="mt-4 flex flex-col">
                {availableMeta.map((key) => (
                  <li
                    key={key}
                    className="flex items-center space-x-1 text-base font-normal"
                  >
                    {metaMap[key].icon}
                    <span>{metaMap[key].label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="px-6 pb-2 pt-4">
          <p className="inline-block rounded-full text-sm">
            {venue.price} NOK/night
          </p>
        </div>
      </div>
      <div className="flex-grow" />
      <div className="flex items-end justify-end p-2 text-end">
        <BaseButton href={`/venue/${venue.id}`}>View</BaseButton>
      </div>
    </div>
  );
};

export default VenueCard;
