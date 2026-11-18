
'use client';

import React, { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  phoneNumber: string;
  image: File | string | null;
};

const initialFormData: FormData = {
  name: '',
  email: '',
  phoneNumber: '',
  image: '',
};

export default function AddUserBtn() {
  const [isOpen, setFormStatus] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const data = new FormData();
      data.append('username', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phoneNumber);
      if (formData.image) {
        data.append('photo', formData.image);
      }

      const res = await fetch('http://localhost:5000/createUser', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('Backend returned error:', errText);
        setErrorMessage(errText || 'Failed to add user');
        setLoading(false);
        return;
      }

      const result = await res.json();
      console.log('User added:', result);

      setFormData(initialFormData);
      setFormStatus(false);
      setLoading(false);
      window.location.reload();
    } catch (error: any) {
      console.error('Fetch error:', error);
      setErrorMessage(error.message || 'Network error');
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setFormStatus(true)}>
        Add User
      </button>

      {isOpen && (
        <div>
          <h2>Add New User</h2>

          {errorMessage && (
            <div style={{ color: 'red', margin: '8px 0', fontWeight: 'bold' }}>
              Error: {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />

     <input
  type="file"
  name="image"
  accept="image/*"
  onChange={(e) =>
    setFormData({
      ...formData,
      image: e.target.files?.[0] || null,
    })
  }
/>

            <button type="submit">
              Submit
            </button>
          </form>

          <button onClick={() => setFormStatus(false)}>
            Close Form
          </button>
        </div>
      )}
    </>
  );
}
