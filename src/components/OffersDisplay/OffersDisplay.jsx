const OffersDisplay = ({ offers }) => {
  const offersMap = {
    wifi: 'Wifi',
    parking: 'Parking',
    pets: 'Pets allowed',
    breakfast: 'Breakfast included',
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
            <li key={index} className="py-1">
              {offer}
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
