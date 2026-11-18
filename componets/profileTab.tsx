'use client';

import React, { useEffect, useState } from 'react';
import { fetchData } from '@/hooks/fetchData';
import UserData from './userData';

type User = {
  _id: string;
  username: string;
  email: string;
  phone: string;
  userProfile?: string;
};

export default function ProfileTab() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchData();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((userData) => (
        <UserData
          key={userData._id}
          name={userData.username}
          email={userData.email}
          phoneNumber={userData.phone}
          image={userData.userProfile}
        />
      ))}
    </div>
  );
}
