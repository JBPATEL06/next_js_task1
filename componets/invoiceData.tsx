"use client";

import React, { useState } from "react";
import { InvoiceType, deleteInvoice } from "@/hooks/invoiceApi";
import InvoiceForm from "./invoiceForm";

export type InvoiceDataProps = {
  invoice: InvoiceType;
  onInvoiceUpdated?: () => void;
};

export default function InvoiceData({
  invoice,
  onInvoiceUpdated,
}: InvoiceDataProps) {
  const [isEdit, setEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete invoice for ${invoice.username}?`)) {
      return;
    }
    setDeleting(true);
    try {
      const res = await deleteInvoice(invoice._id);
      if (res.ok) {
        onInvoiceUpdated?.();
      } else {
        alert("Failed to delete invoice");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting invoice");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
        <div>
          {/* Header: Customer and Total */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{invoice.username}</h3>
              <p className="text-gray-500 text-sm">{invoice.email}</p>
              <p className="text-gray-400 text-xs mt-0.5">{invoice.phone}</p>
            </div>
            <div className="text-right">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">Total</span>
              <span className="font-bold text-gray-900 text-xl text-green-700">₹{invoice.total?.toLocaleString()}</span>
            </div>
          </div>

          {/* Details Row: Weight and Price */}
          <div className="grid grid-cols-2 gap-2 bg-gray-50 rounded-lg p-2.5 text-xs text-gray-600 my-3">
            <div>
              <span className="text-gray-400 block">Weight</span>
              <span className="font-semibold text-gray-800">{invoice.weight} kg</span>
            </div>
            <div>
              <span className="text-gray-400 block">Rate</span>
              <span className="font-semibold text-gray-800">₹{invoice.price} / kg</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-gray-100 mt-2">
          <button
            onClick={() => setEdit(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 rounded-lg transition cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-2 rounded-lg transition cursor-pointer disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {/* Edit Invoice Pop-up Modal */}
      {isEdit && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          onClick={() => setEdit(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <InvoiceForm
              invoiceData={invoice}
              onClose={() => setEdit(false)}
              onSuccess={() => {
                setEdit(false);
                onInvoiceUpdated?.();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
