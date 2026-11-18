import React from 'react';
import Image from 'next/image';

type UserDataProps = {
  name: string;
  email: string;
  phoneNumber: string;
  image?: string;
};

export default function UserData({
  name,
  email,
  phoneNumber,
  image
}: UserDataProps) {
  function getImageUrl(dbValue?: string) {
    if (!dbValue) return '';
    if (dbValue.startsWith('http://') || dbValue.startsWith('https://')) {
      return dbValue;
    }
    const cleanPath = dbValue.replace(/\\/g, '/').replace(/^\/+/, '');
    return `http://localhost:5000/${cleanPath}`;
  }

  const imageUrl = getImageUrl(image);

  return (
    <div className="flex flex-col items-center justify-center gap-2 border-2 border-black p-4 rounded-lg">
      <span>{name}</span>
      <span>{email}</span>
      <span>{phoneNumber}</span>

      {imageUrl ? (
        <Image
          src={imageUrl}
          height={200}
          width={200}
          alt={name || 'User photo'}
          unoptimized
        />
      ) : null}
    </div>
  );
}
