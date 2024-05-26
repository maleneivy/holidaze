'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { API_URL } from '@/utils/api/api';

const Breadcrumb = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [venueName, setVenueName] = useState('');
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    const paths = pathname.split('/').filter((path) => path);
    const isFromProfile = searchParams.get('from') === 'profile';
    const profileName = searchParams.get('profileName');

    const fetchVenueName = async (venueId) => {
      try {
        const response = await fetch(`${API_URL}/holidaze/venues/${venueId}`);
        if (response.ok) {
          const data = await response.json();
          setVenueName(data.data.name);
        }
      } catch (error) {
        console.error('Failed to fetch venue name:', error);
      }
    };

    if (paths[0] === 'venue' && paths[1]) {
      fetchVenueName(paths[1]);
    }

    const items = paths.map((path, index) => {
      let href = '/' + paths.slice(0, index + 1).join('/');
      let name = path.charAt(0).toUpperCase() + path.slice(1);

      if (path === paths[1] && paths[0] === 'venue') {
        name =
          venueName.length > 20 ? `${venueName.slice(0, 20)}...` : venueName;
      }

      return { name, href };
    });

    if (isFromProfile && profileName) {
      items.unshift({ name: profileName, href: `/profile/${profileName}` });
    }

    setBreadcrumbItems(items);
  }, [pathname, searchParams, venueName]);

  return (
    <nav className="ml-4 mt-4 flex flex-wrap items-center p-2">
      <Link href="/" className="mr-2 text-blue hover:underline">
        Home
      </Link>
      {breadcrumbItems.map((item, index) => (
        <span key={index}>
          {' / '}
          {index !== breadcrumbItems.length - 1 ? (
            item.name === 'Venue' ? (
              <span className="mr-2 text-darkGrey">{item.name}</span>
            ) : (
              <Link href={item.href} className="mr-2 text-blue hover:underline">
                {item.name}
              </Link>
            )
          ) : (
            <span className="text-darkGrey">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
