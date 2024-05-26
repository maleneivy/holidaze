import { Icon } from '@/utils/icons';

const OffersDisplay = ({ offers }) => {
  const offersMap = {
    wifi: {
      label: 'Wifi',
      icon: <Icon name="wifi" className="text-lg text-primary" />,
    },
    parking: {
      label: 'Parking',
      icon: <Icon name="parking" className="text-lg text-primary" />,
    },
    pets: {
      label: 'Pets allowed',
      icon: <Icon name="pets" className="text-lg text-primary" />,
    },
    breakfast: {
      label: 'Breakfast included',
      icon: <Icon name="breakfast" className="text-lg text-primary" />,
    },
  };

  const availableOffers = Object.keys(offers)
    .filter((key) => offers[key])
    .map((key) => offersMap[key]);

  return (
    <div>
      <h2>Offers</h2>
      {availableOffers.length > 0 ? (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
          {availableOffers.map((offer, index) => (
            <li key={index} className="flex items-center py-1">
              {offer.icon}
              <span className="ml-2">{offer.label}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-1">No special offers available</p>
      )}
    </div>
  );
};

export default OffersDisplay;
