'use client';
import EditProfileModal from '@/components/Profile/EditProfileModal';
import CreateVenueModal from '@/components/Profile/Venue/CreateVenueModal';
import MyVenuesDisplay from '@/components/Profile/Venue/MyVenuesDisplay';
import React, { useEffect, useState } from 'react';

const ProfilePage = ({ params }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

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
  }, [params.name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleEdit = () => {
    document.body.classList.add('body-lock');
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    document.body.classList.remove('body-lock');
    setIsEditing(false);
  };

  const handleCreateVenue = () => {
    document.body.classList.add('body-lock');
    setIsCreating(true);
  };

  const handleCloseCreateVenue = () => {
    document.body.classList.remove('body-lock');
    setIsCreating(false);
  };

  const handleSave = async (updatedProfile) => {
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${params.name}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'X-Noroff-API-Key': localStorage.getItem('apiKey'),
          },
          body: JSON.stringify(updatedProfile),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      const updatedData = await response.json();
      setProfile(updatedData.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleSaveNewVenue = async (newVenueData) => {
    console.log(newVenueData);
    setIsCreating(false);
  };

  return (
    <>
      <div className="relative">
        <img
          src={profile.banner?.url}
          alt={profile.banner?.alt}
          className="absolute inset-0 -z-10 h-36 w-full object-cover md:h-48"
        />
      </div>
      <div className="mx-auto my-20 flex max-w-128 flex-col">
        <div className="">
          {profile && (
            <>
              <div className="flex flex-col items-center">
                <img
                  src={profile.avatar?.url}
                  alt={profile.avatar?.alt || 'Profile avatar'}
                  className="sm:size-42 size-36 rounded-full object-cover md:size-48"
                />
                <div className="my-4 flex">
                  <div>
                    <a href="#" onClick={handleEdit} className="underline">
                      Edit Profile
                    </a>
                  </div>
                  {profile.venueManager && (
                    <div className="ml-10">
                      <a
                        href="#"
                        onClick={handleCreateVenue}
                        className="underline"
                      >
                        New venue (VM)
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="mx-4 my-6">
                <p>{profile.name}</p>
                <p>{profile.email}</p>
                <h3 className="mb-2 mt-4">Bio</h3>
                <p>{profile.bio ? profile.bio : 'No bio provided'}</p>
              </div>
              <hr className="mx-4 border-lightBlueGrey" />
              <div>
                <MyVenuesDisplay profile={profile} />
              </div>
              <hr className="mx-4 border-lightBlueGrey" />
              <div className="mx-4">
                <h2 className="my-4">My upcoming bookings</h2>
                <div className="my-4 flex flex-col rounded p-4 shadow-md sm:flex-row">
                  <p>First image of booking</p>
                  <div className="border-l-2 border-lightBlueGrey"></div>
                  <p>Info about booking</p>
                </div>
              </div>
              <hr className="mx-4 border-lightBlueGrey" />
            </>
          )}
        </div>
      </div>
      <div className={isEditing || isCreating ? 'blur-sm' : ''}></div>
      {isEditing && (
        <EditProfileModal
          profile={profile}
          onClose={handleCloseEdit}
          onSave={handleSave}
        />
      )}
      {isCreating && (
        <CreateVenueModal
          onClose={handleCloseCreateVenue}
          onSave={handleSaveNewVenue}
        />
      )}
    </>
  );
};

export default ProfilePage;
