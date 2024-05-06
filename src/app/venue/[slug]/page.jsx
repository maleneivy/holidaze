import { fetchSingleVenue } from '@/utils/api/api';
import ClientVenue from '../ClientVenue';

const SpecificVenuePage = async ({ params }) => {
  const { slug } = params;

  const data = await fetchSingleVenue(slug);
  const venue = data.data;

  const images =
    venue.media && venue.media.length > 0
      ? venue.media
      : [{ url: '/default-post-image.jpg', alt: 'Default Image' }];

  return (
    <div className="mx-auto my-5 max-w-4xl">
      <ClientVenue images={images} venue={venue} />
    </div>
  );
};

export default SpecificVenuePage;
