"use client";

import AddUserBtn from "@/componets/addUser";
import Invoice from "@/componets/invoice";
import ProfileTab, { User } from "@/componets/profileTab";
import SearchForm from "@/componets/searchForm";
import { useState, useEffect } from "react";
import { UserFormData } from "@/componets/userform";
import UserForm from "@/componets/userform";
import { fetchData } from "@/hooks/fetchData";

export default function Home() {
  const [users, setUser] = useState<User[]>([]);
  const [isProfile, setProfileTab] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserFormData | undefined>();
  const [getpage, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const openAdd = () => {
    setSelectedUser(undefined);
    setShowForm(true);
  };

  const loadUsers = async (page = 1, query = searchQuery) => {
    const data = await fetchData(page, query);
    setUser(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadUsers(getpage, searchQuery);
  }, [getpage, searchQuery]);

  const handleSearch = (term: string) => {
    setSearchQuery(term);
    setPage(1); // Always reset to page 1 for a new search
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-gray-200 pb-2">
          <button
            onClick={() => setProfileTab(true)}
            className={`px-4 py-2 font-medium text-sm rounded-lg transition cursor-pointer ${
              isProfile
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Profiles
          </button>
          <button
            onClick={() => setProfileTab(false)}
            className={`px-4 py-2 font-medium text-sm rounded-lg transition cursor-pointer ${
              !isProfile
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Invoices
          </button>
        </div>

        {/* Profiles Tab Content */}
        {isProfile ? (
          <div className="space-y-6">
            {/* Search & Add User Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <SearchForm onSearch={handleSearch} />
              <AddUserBtn onClick={openAdd} />
            </div>

            {/* Modal for Adding New User */}
            {showForm && (
              <div
                className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
                onClick={() => setShowForm(false)}
              >
                <div
                  className="bg-white rounded-xl shadow-lg max-w-md w-full p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <UserForm
                    key={selectedUser?.email ?? "new"}
                    userData={selectedUser}
                    onClose={() => setShowForm(false)}
                    onSuccess={() => {
                      setShowForm(false);
                      loadUsers(getpage, searchQuery);
                    }}
                  />
                </div>
              </div>
            )}

            <ProfileTab users={users} onUserUpdated={() => loadUsers(getpage, searchQuery)} />

            {/* Pagination Controls */}
            {users.length > 0 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
                  disabled={getpage <= 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Previous
                </button>

                <span className="text-sm font-semibold text-gray-700">
                  Page {getpage}
                </span>

                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={users.length < 5}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Invoices Tab Content */
          <Invoice />
        )}
      </div>
    </div>
  );
}
