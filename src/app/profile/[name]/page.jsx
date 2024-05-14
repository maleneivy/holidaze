'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ProfilePage = ({ params }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const setupProfile = async () => {
      try {
        const profileResponse = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${params.name}?_venues=true&_bookings=true`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'X-Noroff-API-Key': localStorage.getItem('apiKey'),
            },
          }
        );
        if (!profileResponse.ok) {
          throw new Error('Failed to fetch profile');
        }
        const profileData = await profileResponse.json();
        setProfile(profileData.data);
        console.log(profileData.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    setupProfile();
  }, [params.name]); // Include params.name if it can change

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="relative">
        <img
          src={profile.banner?.url}
          alt={profile.banner?.alt}
          className="absolute inset-0 -z-10 h-36 w-full object-cover md:h-48"
        />
      </div>
      <div className="max-w-128 mx-auto my-20 flex flex-col">
        <div className="">
          {profile && (
            <>
              <div className="flex flex-col items-center">
                <img
                  src={profile.avatar?.url}
                  alt={profile.avatar?.alt || 'Profile avatar'}
                  className="object-fit sm:size-42 size-36 rounded-full md:size-48"
                />
                <Link href="" className="underline">
                  Edit avatar
                </Link>
              </div>
              <div className="my-6 ml-4">
                <p>{profile.name}</p>
                <p>{profile.email}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
