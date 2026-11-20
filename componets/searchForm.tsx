"use client";

import React, { useState } from "react";

type SearchFormProps = {
  onSearch: (term: string) => void;
  className?: string;
};

export default function SearchForm({ onSearch, className }: SearchFormProps) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload!
    onSearch(term);
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="search"
          name="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search name or email..."
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg transition cursor-pointer"
        >
          Search
        </button>
      </form>
    </div>
  );
}