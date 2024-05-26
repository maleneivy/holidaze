import React, { useState, useEffect } from 'react';
import BaseButton from '@/components/BaseButton/BaseButton';

/**
 * EditVenueModal component for editing a venue's details.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.venue - The venue to be edited.
 * @param {Function} props.onClose - The function to close the modal.
 * @param {Function} props.onSaveComplete - The function to handle saving completion.
 * @param {Function} props.onDeleteComplete - The function to handle deletion completion.
 * @returns {JSX.Element} - The rendered component.
 */
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
    maxGuests: 1,
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
    address: '',
    city: '',
    zip: '',
    country: '',
    continent: '',
    currentImage: { url: '', alt: '' },
  });
  const [nameCharCount, setNameCharCount] = useState(0);
  const [descriptionCharCount, setDescriptionCharCount] = useState(0);
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
        maxGuests: venue.maxGuests || 1,
        wifi: venue.meta?.wifi || false,
        parking: venue.meta?.parking || false,
        breakfast: venue.meta?.breakfast || false,
        pets: venue.meta?.pets || false,
        address: venue.location?.address || '',
        city: venue.location?.city || '',
        zip: venue.location?.zip || '',
        country: venue.location?.country || '',
        continent: venue.location?.continent || '',
        currentImage: { url: '', alt: '' },
      });
      setNameCharCount(venue.name?.length || 0);
      setDescriptionCharCount(venue.description?.length || 0);
    }
  }, [venue]);

  /**
   * Handle input changes for text fields.
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setNameCharCount(value.length);
    }
    if (name === 'description') {
      setDescriptionCharCount(value.length);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handle checkbox changes.
   * @param {Object} e - The event object.
   */
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  /**
   * Handle form submission to save the venue.
   * @param {Object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    if (formData.maxGuests < 1) {
      alert('Maximum Guests must be at least 1.');
      setIsSaving(false);
      return;
    }

    if (formData.price > 10000) {
      alert('Price cannot be greater than 10,000.');
      setIsSaving(false);
      return;
    }

    if (!Number.isInteger(parseInt(formData.price, 10))) {
      alert('Price must be a whole number.');
      setIsSaving(false);
      return;
    }

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

  /**
   * Confirm deletion of the venue.
   */
  const confirmDelete = () => {
    setShowConfirmDelete(true);
  };

  /**
   * Handle venue deletion.
   */
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

  /**
   * Handle addition of a new image.
   * @param {Object} event - The event object.
   */
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

  /**
   * Handle removal of an image.
   * @param {number} index - The index of the image to remove.
   */
  const handleRemoveImage = (index) => {
    setFormData((prev) => {
      const updatedImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: updatedImages };
    });
  };

  /**
   * Handle changes to the current image inputs.
   * @param {Object} e - The event object.
   */
  const handleImageChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      currentImage: { ...prev.currentImage, [name]: value },
    }));
  };

  const inputStyles = 'my-2 rounded p-2 shadow border border-lightBlueGrey';
  const checkBoxStyles = 'size-7 rounded shadow-lg mr-2';

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

          <div className="flex flex-col">
            <label htmlFor="name">Venue Name (max 50 characters)</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={50}
              className={inputStyles}
            />
            <span className="text-end">{nameCharCount}/50</span>
          </div>

          <div className="flex flex-col">
            <label htmlFor="description">
              Description (max 1000 characters)
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              maxLength={1000}
              className={inputStyles}
            />
            <span className="text-end">{descriptionCharCount}/1000</span>
          </div>

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

          <div className="flex flex-col">
            <label htmlFor="price">Price (Max 10 000 NOK)</label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              required
              max={10000}
              className={inputStyles}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="maxGuests">Maximum Guests</label>
            <input
              type="number"
              name="maxGuests"
              id="maxGuests"
              value={formData.maxGuests}
              onChange={handleChange}
              required
              min={1}
              className="my-2 w-20 rounded border border-lightBlueGrey p-2 shadow"
            />
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <label className="flex w-fit items-center">
              <input
                type="checkbox"
                name="wifi"
                checked={formData.wifi}
                onChange={handleCheckboxChange}
                className={checkBoxStyles}
              />
              WiFi
            </label>
            <label className="flex w-fit items-center">
              <input
                type="checkbox"
                name="parking"
                checked={formData.parking}
                onChange={handleCheckboxChange}
                className={checkBoxStyles}
              />
              Parking
            </label>
            <label className="flex w-fit items-center">
              <input
                type="checkbox"
                name="breakfast"
                checked={formData.breakfast}
                onChange={handleCheckboxChange}
                className={checkBoxStyles}
              />
              Breakfast
            </label>
            <label className="flex w-fit items-center">
              <input
                type="checkbox"
                name="pets"
                checked={formData.pets}
                onChange={handleCheckboxChange}
                className={checkBoxStyles}
              />
              Pets Allowed
            </label>
          </div>

          <div className="flex flex-col">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="city">City (required)</label>
            <input
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
              required
              className={inputStyles}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="zip">ZIP Code</label>
            <input
              type="text"
              name="zip"
              id="zip"
              value={formData.zip}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="continent">Continent</label>
            <input
              type="text"
              name="continent"
              id="continent"
              value={formData.continent}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>

          <BaseButton
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 rounded px-6 py-2 font-semibold"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </BaseButton>
          {successMessage && <p className="bg-lightGreen">{successMessage}</p>}
        </form>
        <div className="my-4 text-end">
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
