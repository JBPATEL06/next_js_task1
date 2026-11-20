import React, { useState } from "react";
import Image from "next/image";
import UserForm from "./userform";
import { deleteUser } from "@/hooks/deleteUser";

export type UserDataProps = {
  name: string;
  email: string;
  phoneNumber: string;
  image?: string;
  onUserUpdated?: () => void;
};

export default function UserData({
  name,
  email,
  phoneNumber,
  image,
  onUserUpdated,
}: UserDataProps) {
  function getImageUrl(dbValue?: string) {
    if (!dbValue) return "";
    if (dbValue.startsWith("http://") || dbValue.startsWith("https://")) {
      return dbValue;
    }
    const cleanPath = dbValue.replace(/\\/g, "/").replace(/^\/+/, "");
    return `http://localhost:5000/${cleanPath}`;
  }

  const imageUrl = getImageUrl(image);
  const [isEdit, setEdit] = useState(false);

  return (
    <>
      {/* User Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {imageUrl ? (
              <Image
                src={imageUrl}
                height={72}
                width={72}
                alt={name || "User photo"}
                unoptimized
                loading="eager"
                className="w-16 h-16 rounded-full object-cover border border-gray-100"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xl">
                {name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
              <p className="text-gray-500 text-sm">{email}</p>
              <p className="text-gray-400 text-xs mt-1">{phoneNumber}</p>
            </div>
          </div>
          <button
            onClick={() => setEdit(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Edit
          </button>
              <button
            onClick={() =>{ deleteUser(email)
              onUserUpdated?.()
            } }
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Edit Form Pop-up Modal */}
      {isEdit && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          onClick={() => setEdit(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <UserForm
              userData={{ name, email, phoneNumber, image: image ?? "" }}
              onClose={() => setEdit(false)}
              onSuccess={() => {
                setEdit(false);
                onUserUpdated?.();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
