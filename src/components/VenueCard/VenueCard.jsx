const VenueCard = ({ venue }) => {
    const defaultImage = "/default-post-image.jpg";

    const imageUrl = venue.media && venue.media.length > 0 ? venue.media[0].url : defaultImage;
    const imageAlt = venue.media && venue.media.length > 0 && venue.media[0].alt ? venue.media[0].alt : "Venue image";

    return (
        <div className="w-full max-w-sm rounded shadow-lg">
            <img className="w-full h-48 object-cover" src={imageUrl} alt={imageAlt} onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImage;
            }}/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                    <h3 className="text-base">
                        {venue.name}
                    </h3>
                    <p className="text-sm">
                        Max guests: {venue.maxGuests}
                    </p>
                </div>
            </div>
            <div className="px-6 pt-4 pb-2">
                <p className="inline-block rounded-full text-sm">
                    {venue.price} NOK/night
                </p>
            </div>
        </div>
    );
};

export default VenueCard;