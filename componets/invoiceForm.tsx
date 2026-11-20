"use client";

import React, { useState } from "react";
import { addInvoice, editInvoice, InvoiceType } from "@/hooks/invoiceApi";

export type InvoiceFormData = {
  _id?: string;
  username: string;
  email: string;
  phone: string;
  weight: number;
  price: number;
};

const initialFormData: InvoiceFormData = {
  username: "",
  email: "",
  phone: "",
  weight: 1,
  price: 1000,
};

type Props = {
  invoiceData?: InvoiceType; // undefined = add mode
  onClose: () => void;
  onSuccess?: () => void;
};

export default function InvoiceForm({ invoiceData, onClose, onSuccess }: Props) {
  const isEditMode = !!invoiceData;

  const [formData, setFormData] = useState<InvoiceFormData>(
    invoiceData
      ? {
          _id: invoiceData._id,
          username: invoiceData.username,
          email: invoiceData.email,
          phone: invoiceData.phone,
          weight: invoiceData.weight,
          price: invoiceData.price,
        }
      : initialFormData
  );

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const calculatedTotal = (formData.weight || 0) * (formData.price || 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = isEditMode
        ? await editInvoice(invoiceData!._id, {
            username: formData.username,
            phone: formData.phone,
            weight: formData.weight,
            price: formData.price,
          })
        : await addInvoice({
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            weight: formData.weight,
            price: formData.price,
          });

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
          msg || `Failed to ${isEditMode ? "update" : "create"} invoice`
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
        {isEditMode ? "Edit Invoice" : "Create New Invoice"}
      </h2>

      {errorMessage && (
        <div className="text-red-700 bg-red-50 border border-red-200 p-3 rounded-lg mb-4 text-sm font-medium">
          Error: {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Customer Name</label>
          <input
            type="text"
            name="username"
            placeholder="e.g. John Doe"
            value={formData.username}
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
            name="phone"
            placeholder="e.g. 1234567890"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Weight (kg)</label>
            <input
              type="number"
              step="any"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              min="0"
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Price per kg</label>
            <input
              type="number"
              step="any"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Calculated Total Preview */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm flex justify-between items-center">
          <span className="text-gray-600 font-medium">Estimated Total:</span>
          <span className="font-bold text-gray-900 text-base">₹{calculatedTotal.toLocaleString()}</span>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium p-2.5 rounded-lg text-sm transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Saving..." : isEditMode ? "Update Invoice" : "Create Invoice"}
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
