const VenueCard = ({ venue }) => {
    const defaultImage = "/default-post-image.jpg";

    const imageUrl = venue.media && venue.media.length > 0 ? venue.media[0].url : defaultImage;
    const imageAlt = venue.media && venue.media.length > 0 && venue.media[0].alt ? venue.media[0].alt : "Venue image";

    return (
        <div className="max-w-sm rounded shadow-lg">
            <img className="w-full h-48 object-cover" src={imageUrl} alt={imageAlt} onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImage;
            }}/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                    <p className="text-base">
                        {venue.description}
                    </p>
                </div>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block rounded-full px-3 py-1 text-sm">
                    {venue.price} NOK/night
                </span>
            </div>
        </div>
    );
};

export default VenueCard;