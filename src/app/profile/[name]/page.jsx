'use client';
import EditProfileModal from '@/components/Profile/EditProfileModal';
import CreateVenueModal from '@/components/Profile/Venue/CreateVenueModal';
import MyVenuesDisplay from '@/components/Profile/Venue/MyVenuesDisplay';
import BookingCalendar from '@/components/Booking/BookingCalendar';
import React, { useEffect, useState } from 'react';
import { API_URL } from '@/utils/api/api';
import Link from 'next/link';
import Loader from '@/components/Loader/Loader';
import BaseButton from '@/components/BaseButton/BaseButton';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';

const ProfilePage = ({ params }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditingBooking, setIsEditingBooking] = useState(null);
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [editErrors, setEditErrors] = useState({});

  const fetchProfile = async () => {
    try {
      const profileResponse = await fetch(
        `${API_URL}/holidaze/profiles/${params.name}?_venues=true&_bookings=true`,
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
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [params.name]);

  const handleEdit = () => {
    document.body.classList.add('body-lock');
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    document.body.classList.remove('body-lock');
    setIsEditing(false);
    setEditErrors({});
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
        `${API_URL}/holidaze/profiles/${params.name}`,
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
        const errorData = await response.json();
        const newErrors = {};

        errorData.errors.forEach((err) => {
          const key = err.path.join('.');
          newErrors[key] = err.message;
        });

        if (!newErrors['avatar.url']) {
          newErrors['avatar.url'] = 'Invalid URL';
        }
        if (!newErrors['banner.url']) {
          newErrors['banner.url'] = 'Invalid URL';
        }

        setEditErrors(newErrors);
        throw new Error('Failed to update profile');
      }
      await fetchProfile();
      handleCloseEdit();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleSaveNewVenue = async (newVenueData) => {
    console.log(newVenueData);
    setIsCreating(false);
  };

  const addNewVenue = (newVenue) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      venues: [...prevProfile.venues, newVenue],
    }));
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const response = await fetch(
        `${API_URL}/holidaze/bookings/${bookingId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'X-Noroff-API-Key': localStorage.getItem('apiKey'),
          },
        }
      );
      if (response.ok) {
        await fetchProfile();
        alert('Booking deleted successfully');
      } else {
        throw new Error('Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking. Please try again.');
    }
  };

  const handleEditBooking = (booking) => {
    setSelectedDates([new Date(booking.dateFrom), new Date(booking.dateTo)]);
    setIsEditingBooking(booking.id);
  };

  const handleUpdateBooking = async (bookingId, updatedBooking) => {
    try {
      const response = await fetch(
        `${API_URL}/holidaze/bookings/${bookingId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'X-Noroff-API-Key': localStorage.getItem('apiKey'),
          },
          body: JSON.stringify(updatedBooking),
        }
      );
      if (response.ok) {
        await fetchProfile();
        setIsEditingBooking(null);
        alert('Booking updated successfully');
      } else {
        throw new Error('Failed to update booking');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking. Please try again.');
    }
  };

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };

  const confirmDeleteBooking = (bookingId) => {
    setBookingToDelete(bookingId);
    setIsConfirmingDelete(true);
  };

  const cancelDeleteBooking = () => {
    setBookingToDelete(null);
    setIsConfirmingDelete(false);
  };

  const proceedDeleteBooking = () => {
    handleDeleteBooking(bookingToDelete);
    setBookingToDelete(null);
    setIsConfirmingDelete(false);
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <div className="relative">
        <img
          src={profile.banner?.url}
          alt={profile.banner?.alt}
          className="absolute inset-0 -z-10 h-36 w-full object-cover shadow-inner md:h-48"
        />
      </div>
      <div className="mx-auto my-20 flex max-w-128 flex-col">
        <div>
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
                    <a role="button" onClick={handleEdit} className="underline">
                      Edit Profile
                    </a>
                  </div>
                  {profile.venueManager && (
                    <div className="ml-10">
                      <a
                        role="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCreateVenue();
                        }}
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
                <p className="whitesp break-words">
                  {profile.bio ? profile.bio : 'No bio provided'}
                </p>
              </div>
              <hr className="mx-4 border-lightBlueGrey" />
              {profile.venueManager && (
                <>
                  <MyVenuesDisplay profile={profile} />
                  <hr className="mx-4 border-lightBlueGrey" />
                </>
              )}
              <div className="mx-4">
                <h2 className="my-4">My upcoming bookings</h2>
                <div className="my-4 flex flex-col space-y-4">
                  {profile.bookings
                    .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom))
                    .map((booking, index) => {
                      const totalPrice =
                        ((new Date(booking.dateTo) -
                          new Date(booking.dateFrom)) /
                          (1000 * 60 * 60 * 24)) *
                        booking.venue.price;
                      return (
                        <div
                          key={index}
                          className="mt-4 flex flex-col rounded p-4 shadow-md sm:flex-row"
                        >
                          <div>
                            <img
                              src={
                                booking.venue.media[0]?.url ||
                                '/default-image.jpg'
                              }
                              alt={booking.venue.media[0]?.alt || 'Venue image'}
                              className="object-cover sm:size-32"
                            />
                          </div>
                          <div className="ml-4">
                            <Link
                              href={{
                                pathname: `/venue/${booking.venue.id}`,
                                query: {
                                  from: 'profile',
                                  profileName: profile.name,
                                },
                              }}
                            >
                              <p className="mt-2 max-w-xs overflow-hidden truncate underline hover:font-bold sm:mt-0">
                                {booking.venue.name}
                              </p>
                            </Link>
                            <p className="max-w-xs overflow-hidden truncate">
                              {booking.venue.location.city}
                            </p>
                            <p className="max-w-xs overflow-hidden truncate">
                              {booking.venue.location.country}
                            </p>
                            <p>
                              {new Date(booking.dateFrom).toLocaleDateString()}{' '}
                              - {new Date(booking.dateTo).toLocaleDateString()}
                            </p>
                            <p>Guests: {booking.guests}</p>
                            <p>Total cost: {totalPrice} NOK</p>
                            <div className="mx-auto mt-4 flex justify-between">
                              <BaseButton
                                onClick={() => handleEditBooking(booking)}
                                className="mr-2 rounded px-4 py-1 text-blue hover:font-bold focus:bg-yellow-100"
                              >
                                Edit booking
                              </BaseButton>
                              <button
                                onClick={() => confirmDeleteBooking(booking.id)}
                                className="rounded bg-lightRed px-4 py-1 text-darkBlue hover:bg-red hover:text-white"
                              >
                                Delete booking
                              </button>
                            </div>
                            {isEditingBooking === booking.id && (
                              <div className="mt-4">
                                <BookingCalendar
                                  bookings={profile.bookings}
                                  onDateChange={handleDateChange}
                                />
                                <form
                                  onSubmit={async (e) => {
                                    e.preventDefault();
                                    const updatedBooking = {
                                      dateFrom: selectedDates[0].toISOString(),
                                      dateTo: selectedDates[1].toISOString(),
                                      guests: Number(e.target.guests.value),
                                    };
                                    await handleUpdateBooking(
                                      booking.id,
                                      updatedBooking
                                    );
                                  }}
                                >
                                  <div className="flex flex-col">
                                    <div className="flex items-baseline justify-between">
                                      <label>
                                        Guests:
                                        <input
                                          type="number"
                                          name="guests"
                                          defaultValue={booking.guests}
                                          min="1"
                                          max={booking.venue.maxGuests}
                                          className="ml-2 rounded border px-2"
                                        />
                                      </label>
                                    </div>
                                    <div className="mt-4">
                                      <button
                                        type="submit"
                                        className="mt-2 rounded bg-green-500 px-4 py-1 text-white hover:bg-green-400"
                                      >
                                        Save
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setIsEditingBooking(null)
                                        }
                                        className="ml-2 mt-2 rounded bg-gray-500 px-4 py-1 text-white hover:bg-gray-400"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
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
          errors={editErrors}
        />
      )}
      {isCreating && (
        <CreateVenueModal
          onClose={handleCloseCreateVenue}
          onSave={handleSaveNewVenue}
          onAddVenue={addNewVenue}
        />
      )}
      {isConfirmingDelete && (
        <ConfirmationModal
          message="Are you sure you want to delete the booking?"
          onConfirm={proceedDeleteBooking}
          onCancel={cancelDeleteBooking}
        />
      )}
    </main>
  );
};

export default ProfilePage;
