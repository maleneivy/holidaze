export const API_URL = 'https://v2.api.noroff.dev';

// Fetch venues
export const fetchVenues = async () => {
  const response = await fetch(`${API_URL}/holidaze/venues?_bookings=true`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch venues');
  }
  return await response.json();
};

// Fetch single venue
export const fetchSingleVenue = async (slug) => {
  const response = await fetch(
    `${API_URL}/holidaze/venues/${slug}?_owner=true&_bookings=true`,
    { cache: 'no-store' }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch venue');
  }
  return await response.json();
};
