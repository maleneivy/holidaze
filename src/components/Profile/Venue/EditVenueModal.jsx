import React, { useState, useEffect } from 'react';
import BaseButton from '@/components/BaseButton/BaseButton';

const EditVenueModal = ({
  venue,
  onClose,
  onSaveComplete,
  onDeleteComplete,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: [],
    price: '',
    maxGuests: '',
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
    address: '',
    city: '',
    zip: '',
    country: '',
    continent: '',
    lat: '',
    lng: '',
    currentImage: { url: '', alt: '' },
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (venue) {
      setFormData({
        name: venue.name || '',
        description: venue.description || '',
        images: Array.isArray(venue.media) ? venue.media : [],
        price: venue.price || '',
        maxGuests: venue.maxGuests || '',
        wifi: venue.meta?.wifi || false,
        parking: venue.meta?.parking || false,
        breakfast: venue.meta?.breakfast || false,
        pets: venue.meta?.pets || false,
        address: venue.location?.address || '',
        city: venue.location?.city || '',
        zip: venue.location?.zip || '',
        country: venue.location?.country || '',
        continent: venue.location?.continent || '',
        lat: venue.location?.lat || '',
        lng: venue.location?.lng || '',
        currentImage: { url: '', alt: '' },
      });
    }
  }, [venue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    const submitData = {
      ...formData,
      price: parseInt(formData.price, 10),
      maxGuests: parseInt(formData.maxGuests, 10),
      media: formData.images.map((img) => ({ url: img.url, alt: img.alt })),
      meta: {
        wifi: formData.wifi,
        parking: formData.parking,
        breakfast: formData.breakfast,
        pets: formData.pets,
      },
      location: {
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
        country: formData.country,
        continent: formData.continent,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
      },
    };

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${venue.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'X-Noroff-API-Key': localStorage.getItem('apiKey'),
          },
          body: JSON.stringify(submitData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save venue changes');
      }

      const result = await response.json();
      onSaveComplete(result.data);
      setIsSaving(false);
      setSuccessMessage('Venue updated successfully!');
      setTimeout(() => setSuccessMessage(''), 10000);
    } catch (error) {
      setError(`Update failed: ${error.message}`);
      setIsSaving(false);
      console.error('Failed to update venue:', error);
    }
  };

  const confirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleDelete = async () => {
    setShowConfirmDelete(false);
    setIsDeleting(true);
    setError('');
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${venue.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'X-Noroff-API-Key': localStorage.getItem('apiKey'),
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete venue');
      }

      onDeleteComplete(venue.id);
    } catch (error) {
      setError(error.message);
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleImageAddition = (event) => {
    event.preventDefault();
    if (formData.images.length >= 10) {
      alert('You cannot add more than 10 images.');
      return;
    }
    if (formData.currentImage.url && formData.currentImage.alt) {
      const img = new Image();
      img.onload = () => {
        setFormData((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            { url: formData.currentImage.url, alt: formData.currentImage.alt },
          ],
          currentImage: { url: '', alt: '' },
        }));
      };
      img.onerror = () => {
        alert(
          'Invalid image URL. Please enter a valid URL that loads an image.'
        );
      };
      img.src = formData.currentImage.url;
    } else {
      alert('Please enter both URL and alt text for the image.');
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => {
      const updatedImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: updatedImages };
    });
  };

  const handleImageChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      currentImage: { ...prev.currentImage, [name]: value },
    }));
  };

  const inputStyles = 'my-2 rounded p-2 shadow border border-lightBlueGrey';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue bg-opacity-50">
      <div className="modal-content relative flex w-full max-w-2xl flex-col rounded-lg bg-light p-5 shadow-lg">
        <span
          className="close m-2 h-fit w-fit self-end px-3 py-2 text-3xl hover:cursor-pointer hover:rounded hover:bg-light active:bg-lightBlueGrey"
          onClick={onClose}
        >
          &times;
        </span>
        <form onSubmit={handleSubmit} className="mx-10 flex flex-col space-y-4">
          <h2>Edit Venue</h2>
          <p>{venue.id}</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Venue Name"
            required
            className={inputStyles}
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className={inputStyles}
          />
          <h2>Images</h2>
          {formData.images.length > 0 ? (
            formData.images.map((image, index) => (
              <div
                key={index}
                className="my-2 flex items-center justify-between"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="h-20 w-20 rounded object-cover"
                />
                <BaseButton
                  onClick={() => handleRemoveImage(index)}
                  className="ml-2"
                >
                  Remove
                </BaseButton>
              </div>
            ))
          ) : (
            <img
              src="/default-post-image.jpg"
              alt="Default Venue Image"
              className="h-20 w-20 rounded object-cover"
            />
          )}
          <div className="flex flex-col space-x-2 rounded border-lightBlueGrey p-2 shadow sm:flex-row">
            <input
              type="url"
              name="url"
              placeholder="Image URL"
              value={formData.currentImage.url}
              onChange={handleImageChange}
              className={inputStyles}
            />
            <input
              type="text"
              name="alt"
              placeholder="Image Alt Text"
              value={formData.currentImage.alt}
              onChange={handleImageChange}
              className={inputStyles}
            />
            <BaseButton
              type="button"
              onClick={handleImageAddition}
              className="bg-blue-600 hover:bg-blue-700 rounded px-2 py-2"
              disabled={formData.images.length >= 10}
            >
              Add Image
            </BaseButton>
          </div>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className={inputStyles}
          />
          <input
            type="number"
            name="maxGuests"
            value={formData.maxGuests}
            onChange={handleChange}
            placeholder="Maximum Guests"
            required
            className={inputStyles}
          />
          <div>
            <label>
              <input
                type="checkbox"
                name="wifi"
                checked={formData.wifi}
                onChange={handleCheckboxChange}
              />
              WiFi
            </label>
            <label>
              <input
                type="checkbox"
                name="parking"
                checked={formData.parking}
                onChange={handleCheckboxChange}
              />
              Parking
            </label>
            <label>
              <input
                type="checkbox"
                name="breakfast"
                checked={formData.breakfast}
                onChange={handleCheckboxChange}
              />
              Breakfast
            </label>
            <label>
              <input
                type="checkbox"
                name="pets"
                checked={formData.pets}
                onChange={handleCheckboxChange}
              />
              Pets Allowed
            </label>
          </div>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className={inputStyles}
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className={inputStyles}
          />
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            placeholder="ZIP Code"
            className={inputStyles}
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className={inputStyles}
          />
          <input
            type="text"
            name="continent"
            value={formData.continent}
            onChange={handleChange}
            placeholder="Continent"
            className={inputStyles}
          />
          <input
            type="number"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
            placeholder="Latitude"
            className={inputStyles}
          />
          <input
            type="number"
            name="lng"
            value={formData.lng}
            onChange={handleChange}
            placeholder="Longitude"
            className={inputStyles}
          />
          <BaseButton
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 rounded px-6 py-2 font-semibold"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </BaseButton>
          {successMessage && <p className="bg-lightGreen">{successMessage}</p>}
        </form>
        <div className="my-4">
          <BaseButton
            type="button"
            onClick={confirmDelete}
            className="rounded px-6 py-2 font-semibold"
            disabled={isDeleting}
          >
            Delete Venue
          </BaseButton>
          <div className="flex items-center justify-between">
            {showConfirmDelete && (
              <>
                <p>Are you sure you want to delete this venue?</p>
                <BaseButton
                  onClick={handleDelete}
                  className="bg-red hover:bg-lightRed"
                >
                  Yes, Delete
                </BaseButton>
                <BaseButton onClick={() => setShowConfirmDelete(false)}>
                  Cancel
                </BaseButton>
              </>
            )}
            {error && <p className="text-red">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVenueModal;
