'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BaseButton from '../BaseButton/BaseButton';
import Link from 'next/link';
import { useAuth } from '@/app/lib/authProvider';

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const loginResponse = await loginApi(formData.email, formData.password);
      const account = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(account.errors[0].message || 'Failed to login');
      }

      const apiKeyResponse = await createApiKey(account.data.accessToken);
      const apiKey = await apiKeyResponse.json();

      if (!apiKeyResponse.ok) {
        throw new Error(apiKey.errors[0].message || 'Failed to create API key');
      }

      login(account.data.accessToken, account.data.name, apiKey.data.key);

      router.push(`/profile/${account.data.name}`);
    } catch (error) {
      setError(error.message);
    } finally {
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
        {error && <p className="text-red">{error}</p>}
      </form>
    </>
  );
}

export default LoginForm;

const loginApi = async (email, password) => {
  const response = await fetch(`https://v2.api.noroff.dev/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

const createApiKey = async (token) => {
  const response = await fetch(
    `https://v2.api.noroff.dev/auth/create-api-key`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response;
};
