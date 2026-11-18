'use client';

import React from 'react';
import { search } from '@/app/actions';

export default function SearchForm({ className }: { className?: string }) {
  return (
    <div className={className}>
      <form action={search} className="flex gap-2">
        <input className="border-2" type="search" name="search" id="search" />
        <button type="submit" className="btn-red-100">search</button>
      </form>
    </div>
  );
}
