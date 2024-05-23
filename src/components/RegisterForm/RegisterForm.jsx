'use client';

import React, { useState } from 'react';
import BaseButton from '../BaseButton/BaseButton';
import Link from 'next/link';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    venueManager: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const form = event.target;

    const formData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      venueManager: form.venueManager.checked,
    };

    try {
      const response = await fetch(`https://v2.api.noroff.dev/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Failed to register:', errorResponse.errors[0].message);
        throw new Error(
          'Failed to register: ' + errorResponse.errors[0].message
        );
      }

      const result = await response.json();
      console.log('Registration successful:', result);
      setFormData({ name: '', email: '', password: '', venueManager: false });
      setSuccess('Registration was successfull. You may now log in');
      setLoading(false);
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const inputClasses = `
  p-2 shadow-md rounded my-2
  `;

  return (
    <>
      <h1 className="mx-2">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="md:w-0-auto mx-2 flex w-72 flex-col"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Username"
          required
          className={inputClasses}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className={inputClasses}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className={inputClasses}
        />
        <label className="mt-4 flex cursor-pointer items-center space-x-2">
          <input
            type="checkbox"
            name="venueManager"
            checked={formData.venueManager}
            onChange={handleChange}
            className="sr-only"
          />
          <span
            className={`inline-block size-5 rounded ${formData.venueManager ? 'bg-blue-500' : 'bg-grey'}`}
          >
            {formData.venueManager && (
              <span className="inline-block size-5 rounded bg-grey text-center text-lg text-primary">
                ✔
              </span>
            )}
          </span>
          <span>Register as Venue Manager</span>
        </label>
        <div className="flex items-baseline justify-between">
          <Link href="/login" className="underline">
            Log in
          </Link>
          <BaseButton
            type="submit"
            disabled={loading}
            className="mt-4 max-w-fit"
          >
            {loading ? 'Registering...' : 'Register'}
          </BaseButton>
        </div>
        <div className="mt-3">
          {error && <p className="text-red">{error}</p>}
          {success && <p className="rounded bg-lightGreen p-1">{success}</p>}
        </div>
      </form>
    </>
  );
}

export default RegistrationForm;
