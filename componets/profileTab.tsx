'use client';

import React from 'react';
import UserData from './userData';

export type User = {
  _id: string;
  username: string;
  email: string;
  phone: string;
  userProfile?: string;
};

type ProfileTabProps = {
  users: User[];
  onUserUpdated?: () => void;
};

export default function ProfileTab({ users, onUserUpdated }: ProfileTabProps) {
  if (!users || users.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10 bg-white border border-gray-200 rounded-xl">
        No users found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {users.map((userData) => (
        <UserData
          key={userData._id}
          name={userData.username}
          email={userData.email}
          phoneNumber={userData.phone}
          image={userData.userProfile}
          onUserUpdated={onUserUpdated}
        />
      ))}
    </div>
  );
}
