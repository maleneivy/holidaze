"use client"

import { fetchVenues } from '@/utils/api/api';
import { useEffect, useState } from 'react';

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
        <div>
            {venues.map(venue => (
                <div key={venue.id}>{venue.name}</div>
            ))}
        </div>
    );
};

export default GetVenues;
