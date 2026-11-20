"use client";

import { adduser } from "@/hooks/adduser";
import { editUser } from "@/hooks/editUser";
import React, { useState } from "react";

export type UserFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  image: File | string | null;
};

const initialFormData: UserFormData = {
  name: "",
  email: "",
  phoneNumber: "",
  image: "",
};

type Props = {
  userData?: UserFormData; // undefined = add mode
  onClose: () => void;
  onSuccess?: () => void;
};

export default function UserForm({ userData, onClose, onSuccess }: Props) {
  const isEditMode = !!userData;

  const [formData, setFormData] = useState<UserFormData>(
    userData ?? initialFormData
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const data = new FormData();
      data.append("username", formData.name);
      data.append("phone", formData.phoneNumber);
      if (!isEditMode) data.append("email", formData.email);

      if (formData.image instanceof File) {
        data.append("photo", formData.image);
      }

      const res = isEditMode
        ? await editUser(userData!.email, data)
        : await adduser(data);

      if (!res.ok) {
        const text = await res.text();
        let msg = "";
        try {
          const json = JSON.parse(text);
          msg = json?.error || json?.message;
        } catch {
          msg = text;
        }
        setErrorMessage(
          msg || `Failed to ${isEditMode ? "update" : "add"} user`
        );
        return;
      }

      onSuccess?.();
      onClose();
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {isEditMode ? "Edit User" : "Add New User"}
      </h2>

      {errorMessage ? (
        <div className="text-red-700 bg-red-50 border border-red-200 p-3 rounded-lg mb-4 text-sm font-medium">
          Error: {errorMessage}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="e.g. john@example.com"
            value={formData.email}
            onChange={handleChange}
            readOnly={isEditMode}
            required
            className={`w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none ${
              isEditMode ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white focus:border-blue-500"
            }`}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="e.g. 1234567890"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {isEditMode && typeof formData.image === "string" && formData.image && (
          <div className="flex items-center gap-3 py-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`http://localhost:5000/${formData.image.replace(/\\/g, "/")}`}
              alt="Current avatar"
              className="w-12 h-12 rounded-full object-cover border border-gray-200"
            />
            <span className="text-xs text-gray-500">Current photo</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Profile Photo</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                image: e.target.files?.[0] ?? prev.image,
              }))
            }
            className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium p-2.5 rounded-lg text-sm transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Saving..." : isEditMode ? "Update" : "Submit"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2.5 rounded-lg text-sm transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
