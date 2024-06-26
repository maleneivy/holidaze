'use client';

import React, { useState, useEffect, useRef } from 'react';
import BaseButton from '@/components/BaseButton/BaseButton';

/**
 * CreateVenueModal component for creating a new venue.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onClose - The function to close the modal.
 * @param {Function} props.onSave - The function to handle saving the new venue.
 * @param {Function} props.onAddVenue - The function to handle adding the new venue to the profile.
 * @returns {JSX.Element} - The rendered component.
 */
const CreateVenueModal = ({ onClose, onSave, onAddVenue }) => {
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

  const priceRef = useRef(null);
  const maxGuestsRef = useRef(null);

  // Add event listeners to prevent scroll on number input fields
  useEffect(() => {
    const preventScroll = (e) => e.preventDefault();

    const priceInput = priceRef.current;
    const maxGuestsInput = maxGuestsRef.current;

    if (priceInput) priceInput.addEventListener('wheel', preventScroll);
    if (maxGuestsInput) maxGuestsInput.addEventListener('wheel', preventScroll);

    return () => {
      if (priceInput) priceInput.removeEventListener('wheel', preventScroll);
      if (maxGuestsInput)
        maxGuestsInput.removeEventListener('wheel', preventScroll);
    };
  }, []);

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
   * Handle addition of a new image.
   */
  const handleAddImage = () => {
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
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
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

  /**
   * Handle form submission to create a new venue.
   * @param {Object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentImage, ...submitData } = formData;

    if (submitData.maxGuests < 1) {
      alert('Maximum Guests must be at least 1.');
      return;
    }

    if (submitData.price > 10000) {
      alert('Price cannot be greater than 10,000.');
      return;
    }

    if (!Number.isInteger(parseInt(submitData.price, 10))) {
      alert('Price must be a whole number.');
      return;
    }

    const venueData = {
      ...submitData,
      price: parseInt(submitData.price),
      maxGuests: parseInt(submitData.maxGuests),
      media: submitData.images.map((img) => ({ url: img.url, alt: img.alt })),
      meta: {
        wifi: submitData.wifi,
        parking: submitData.parking,
        breakfast: submitData.breakfast,
        pets: submitData.pets,
      },
      location: {
        address: submitData.address,
        city: submitData.city,
        zip: submitData.zip,
        country: submitData.country,
        continent: submitData.continent,
      },
    };

    try {
      const response = await fetch(
        'https://v2.api.noroff.dev/holidaze/venues',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'X-Noroff-API-Key': localStorage.getItem('apiKey'),
          },
          body: JSON.stringify(venueData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create venue');
      }
      const result = await response.json();
      onSave(result.data);
      onAddVenue(result.data);
      onClose();
    } catch (error) {
      console.error('Error creating venue:', error);
    }
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
          <h2>Create New Venue</h2>

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
          {formData.images.map((image, index) => (
            <div key={index} className="my-2 flex items-center justify-between">
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
          ))}
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
              onClick={handleAddImage}
              className="bg-blue-600 hover:bg-blue-700 rounded px-2 py-2"
            >
              Save Image
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
              ref={priceRef}
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
              className={inputStyles}
              ref={maxGuestsRef}
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

          <div className="mt-6 flex justify-end">
            <BaseButton
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 rounded px-6 py-2 font-semibold"
            >
              Save Venue
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVenueModal;
