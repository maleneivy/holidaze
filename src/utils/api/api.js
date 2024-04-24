const API_URL = "https://v2.api.noroff.dev";

// Fetch venues
export const fetchVenues = async () => {
    const response = await fetch(`${API_URL}/holidaze/venues`);
    if (!response.ok) {
        throw new Error('Failed to fetch venues');
    }
    return await response.json();
};