"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { searchOffices } from "@/data/offices";
import type { Floor, Office } from "@/data/offices";

interface SearchBarProps {
  onSearchResults: (
    results: { floor: Floor; office: Office }[],
    query: string
  ) => void;
  onClearSearch: () => void;
}

export default function SearchBar({
  onSearchResults,
  onClearSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);

    if (searchQuery.trim()) {
      setIsSearching(true);
      const results = searchOffices(searchQuery);
      onSearchResults(results, searchQuery);
    } else {
      setIsSearching(false);
      onClearSearch();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setIsSearching(false);
    onClearSearch();
  };

  return (
    <div className="relative mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search offices, departments, or rooms..."
          className="w-full pl-12 pr-12 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm placeholder:text-gray-500 placeholder:font-normal"
        />
        {isSearching && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isSearching && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-blue-50 border border-blue-200 rounded-lg p-2 text-sm text-blue-700 shadow-lg z-10">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Searching for &quot;{query}&quot;</span>
          </div>
        </div>
      )}
    </div>
  );
}
