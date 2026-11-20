"use client";

export default function AddUserBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition cursor-pointer"
    >
      + Add User
    </button>
  );
}
