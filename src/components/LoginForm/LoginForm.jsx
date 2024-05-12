'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BaseButton from '../BaseButton/BaseButton';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://v2.api.noroff.dev/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result);
        throw new Error(result.errors[0].message || 'Failed to login');
      }

      console.log('Login successful:', result);
      localStorage.setItem('token', result.data.accessToken);
      setLoading(false);
      router.push('/profile');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const inputClasses = 'p-2 shadow-md rounded my-2';
  return (
    <>
      <h1 className="mx-2">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="md:w-0-auto mx-2 flex w-72 flex-col"
      >
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
        <div className="flex items-baseline justify-between">
          <Link href="/register" className="underline">
            Register
          </Link>
          <BaseButton
            type="submit"
            disabled={loading}
            className="mt-4 max-w-fit"
          >
            {loading ? 'Logging in...' : 'Login'}
          </BaseButton>
        </div>
        <div className="mt-3">
          {error && <p className="text-red">{error}</p>}
        </div>
      </form>
    </>
  );
}

export default LoginForm;
