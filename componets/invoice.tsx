"use client";

import React, { useEffect, useState } from "react";
import { fetchInvoices, InvoiceType } from "@/hooks/invoiceApi";
import InvoiceData from "./invoiceData";
import InvoiceForm from "./invoiceForm";

export default function Invoice() {
  const [invoices, setInvoices] = useState<InvoiceType[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadInvoices = async (pageNum: number = page, query: string = searchQuery) => {
    setLoading(true);
    const data = await fetchInvoices(pageNum, query);
    setInvoices(data);
    setLoading(false);
  };

  useEffect(() => {
    loadInvoices(page, searchQuery);
  }, [page, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setPage(1); // Reset to page 1 for new search
  };

  return (
    <div className="space-y-6">
      {/* Top Header: Search and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full sm:w-auto">
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search invoice by name or email..."
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 w-full sm:w-72"
          />
          <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Search
          </button>
        </form>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition cursor-pointer text-sm w-full sm:w-auto"
        >
          + Add Invoice
        </button>
      </div>

      {/* Add Invoice Pop-up Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <InvoiceForm
              onClose={() => setShowAddModal(false)}
              onSuccess={() => {
                setShowAddModal(false);
                loadInvoices(page, searchQuery);
              }}
            />
          </div>
        </div>
      )}

      {/* Invoices List */}
      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading invoices...</div>
      ) : invoices.length === 0 ? (
        <div className="text-center text-gray-500 py-10 bg-white border border-gray-200 rounded-xl">
          No invoices found. Click <strong>+ Add Invoice</strong> to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {invoices.map((inv) => (
            <InvoiceData
              key={inv._id}
              invoice={inv}
              onInvoiceUpdated={() => loadInvoices(page, searchQuery)}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {invoices.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
            disabled={page <= 1}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Previous
          </button>

          <span className="text-sm font-semibold text-gray-700">
            Page {page}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={invoices.length < 5}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
