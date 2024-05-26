import { fetchSingleVenue } from '@/utils/api/api';
import SpecificVenueDisplay from '../SpecificVenueDisplay';
import Breadcrumb from '@/components/BreadCrumb/BreadCrumb';

export const metadata = {
  title: 'Venue Page',
  description: 'Specific venue page on Holidaze',
};

const SpecificVenuePage = async ({ params }) => {
  const { slug } = params;

  const data = await fetchSingleVenue(slug);
  const venue = data.data;

  const images =
    venue.media && venue.media.length > 0
      ? venue.media
      : [{ url: '/default-post-image.jpg', alt: 'Default Image' }];

  return (
    <div>
      <Breadcrumb />
      <div className="mx-6">
        <div className="mx-auto my-5 max-w-6xl">
          <SpecificVenueDisplay images={images} venue={venue} />
        </div>
      </div>
    </div>
  );
};

export default SpecificVenuePage;
