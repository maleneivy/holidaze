'use client';

import { useState } from 'react';
import BaseButton from '../BaseButton/BaseButton';

const EditProfileModal = ({ profile, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    bio: profile.bio || '',
    venueManager: profile.venueManager || false,
    avatarUrl: profile.avatar?.url || '',
    avatarAlt: profile.avatar?.alt || 'User avatar',
    bannerUrl: profile.banner?.url || '',
    bannerAlt: profile.banner?.alt || 'Profile banner',
  });

  const [bioCharCount, setBioCharCount] = useState(formData.bio.length);
  const [avatarAltCharCount, setAvatarAltCharCount] = useState(
    formData.avatarAlt.length
  );
  const [bannerAltCharCount, setBannerAltCharCount] = useState(
    formData.bannerAlt.length
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'bio') setBioCharCount(value.length);
    if (name === 'avatarAlt') setAvatarAltCharCount(value.length);
    if (name === 'bannerAlt') setBannerAltCharCount(value.length);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessages = {};
    try {
      await onSave({
        bio: formData.bio,
        venueManager: formData.venueManager,
        avatar: { url: formData.avatarUrl, alt: formData.avatarAlt },
        banner: { url: formData.bannerUrl, alt: formData.bannerAlt },
      });
      setErrors({});
    } catch (error) {
      error.errors.forEach((err) => {
        errorMessages[err.path.join('.')] = err.message;
      });
      setErrors(errorMessages);
    }
  };

  const inputStyles = `
  my-2 rounded p-2 shadow border border-lightBlueGrey
  `;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue bg-opacity-50">
      <div className="modal-content relative w-full max-w-2xl rounded-lg bg-light p-5 shadow-lg">
        <span
          className="absolute right-0 top-0 m-4 cursor-pointer text-3xl leading-none hover:text-grey"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-center text-lg font-semibold">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="bio">
                Bio:{' '}
                <span className="text-sm text-darkGrey">
                  (max 160 characters)
                </span>
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                maxLength={160}
                className="my-2 rounded border border-lightBlueGrey bg-white p-2 shadow"
              />
              <div className="text-right text-sm text-blue">
                {bioCharCount}/160
              </div>
              {errors['bio'] && <div className="text-red">{errors['bio']}</div>}
            </div>
            <div className="flex items-center">
              <label htmlFor="venueManager">Venue Manager:</label>
              <input
                type="checkbox"
                id="venueManager"
                name="venueManager"
                checked={formData.venueManager}
                onChange={handleCheckboxChange}
                className="ml-4 h-5 w-5 rounded text-blue focus:ring-blue"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="avatarUrl">Avatar URL</label>
              <input
                type="url"
                id="avatarUrl"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
                className={inputStyles}
              />
              {errors['avatar.url'] && (
                <div className="text-red">{errors['avatar.url']}</div>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="avatarAlt">
                Avatar Alt Text:{' '}
                <span className="text-sm text-darkGrey">
                  (max 120 characters)
                </span>
              </label>
              <input
                type="text"
                id="avatarAlt"
                name="avatarAlt"
                value={formData.avatarAlt}
                onChange={handleChange}
                maxLength={120}
                className={inputStyles}
              />
              <div className="text-right text-sm text-blue">
                {avatarAltCharCount}/120
              </div>
              {errors['avatar.alt'] && (
                <div className="text-red">{errors['avatar.alt']}</div>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="bannerUrl">Banner URL</label>
              <input
                type="url"
                id="bannerUrl"
                name="bannerUrl"
                value={formData.bannerUrl}
                onChange={handleChange}
                className={inputStyles}
              />
              {errors['banner.url'] && (
                <div className="text-red">{errors['banner.url']}</div>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="bannerAlt">
                Banner Alt Text:{' '}
                <span className="text-sm text-darkGrey">
                  (max 120 characters)
                </span>
              </label>
              <input
                type="text"
                id="bannerAlt"
                name="bannerAlt"
                value={formData.bannerAlt}
                onChange={handleChange}
                maxLength={120}
                className={inputStyles}
              />
              <div className="text-right text-sm text-blue">
                {bannerAltCharCount}/120
              </div>
              {errors['banner.alt'] && (
                <div className="text-red">{errors['banner.alt']}</div>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <BaseButton type="submit">Save changes</BaseButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
