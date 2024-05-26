'use client';
import EditProfileModal from '@/components/Profile/EditProfileModal';
import CreateVenueModal from '@/components/Profile/Venue/CreateVenueModal';
import MyVenuesDisplay from '@/components/Profile/Venue/MyVenuesDisplay';
import Loader from '@/components/Loader/Loader';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';
import BookingsList from './BookingsList';
import React, { useEffect, useState } from 'react';
import { API_URL } from '@/utils/api/api';

const ProfileDisplay = ({ params }) => {
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
        {profile && (
          <>
            <ProfileHeader
              profile={profile}
              handleEdit={handleEdit}
              handleCreateVenue={handleCreateVenue}
            />
            <ProfileInfo profile={profile} />
            <hr className="mx-4 border-lightBlueGrey" />
            {profile.venueManager && (
              <>
                <MyVenuesDisplay profile={profile} />
                <hr className="mx-4 border-lightBlueGrey" />
              </>
            )}
            <BookingsList
              profile={profile}
              bookings={profile.bookings}
              selectedDates={selectedDates}
              isEditingBooking={isEditingBooking}
              handleEditBooking={handleEditBooking}
              handleDateChange={handleDateChange}
              handleUpdateBooking={handleUpdateBooking}
              confirmDeleteBooking={confirmDeleteBooking}
              setIsEditingBooking={setIsEditingBooking}
            />
            <hr className="mx-4 border-lightBlueGrey" />
          </>
        )}
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

export default ProfileDisplay;
