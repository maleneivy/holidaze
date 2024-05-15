'use client';

import React, { useState } from 'react';
import BaseButton from '@/components/BaseButton/BaseButton';

const CreateVenueModal = ({ onClose, onSave }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

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
      img.src = formData.currentImage.url; // This starts the image loading check
    } else {
      alert('Please enter both URL and alt text for the image.');
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      currentImage: { ...prev.currentImage, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentImage, ...submitData } = formData; // Remove temporary image state before submitting
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
        lat: parseFloat(submitData.lat),
        lng: parseFloat(submitData.lng),
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
      onClose();
    } catch (error) {
      console.error('Error creating venue:', error);
    }
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
          <h2>Create New Venue</h2>
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
