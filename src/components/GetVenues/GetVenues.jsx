"use client"

import { fetchVenues } from '@/utils/api/api';
import { useEffect, useState } from 'react';
import VenueCard from '../VenueCard/VenueCard';

const GetVenues = () => {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        const getVenues = async () => {
            try {
                const data = await fetchVenues();
                console.log(data)
                setVenues(data.data);
            } catch (error) {
                console.error("Error fetching venues", error);
            }
        };

        getVenues();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4 mx-5">
            {venues.map(venue => (
               <VenueCard key={venue.id} venue={venue}> </VenueCard>
            ))}
        </div>
    );
};

export default GetVenues;
