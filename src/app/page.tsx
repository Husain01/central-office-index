"use client";

import { useState } from "react";
import { Building, Search as SearchIcon, Wifi } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import FloorCard from "@/components/FloorCard";
import SearchResults from "@/components/SearchResults";
import InstallButton from "@/components/InstallButton";
import { floors } from "@/data/offices";
import type { Floor, Office } from "@/data/offices";

export default function Home() {
  const [searchResults, setSearchResults] = useState<
    { floor: Floor; office: Office }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Sort floors by level for proper display order
  const sortedFloors = [...floors].sort((a, b) => b.level - a.level);

  const handleSearchResults = (
    results: { floor: Floor; office: Office }[],
    query: string
  ) => {
    setSearchResults(results);
    setSearchQuery(query);
    setIsSearching(true);
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    setSearchQuery("");
    setIsSearching(false);
  };

  // Get total office count
  const totalOffices = floors.reduce(
    (sum, floor) => sum + floor.offices.length,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Ashara Central Office - MSB
                </h1>
                <p className="text-sm text-gray-600">
                  {totalOffices} offices across {floors.length} floors
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Install Button */}
        <InstallButton />

        {/* Search Section */}
        <div className="mb-8">
          <SearchBar
            onSearchResults={handleSearchResults}
            onClearSearch={handleClearSearch}
          />
        </div>

        {/* Content */}
        {isSearching ? (
          <SearchResults results={searchResults} query={searchQuery} />
        ) : (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 text-center border border-blue-100 shadow-sm">
                <div className="text-2xl font-bold text-blue-600">
                  {floors.length}
                </div>
                <div className="text-xs text-gray-600">Floors</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-blue-100 shadow-sm">
                <div className="text-2xl font-bold text-blue-600">
                  {totalOffices}
                </div>
                <div className="text-xs text-gray-600">Offices</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-blue-100 shadow-sm">
                <div className="text-2xl font-bold text-blue-600">
                  {floors.length}
                </div>
                <div className="text-xs text-gray-600">Floor Heads</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-blue-100 shadow-sm">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-xs text-gray-600">Support</div>
              </div>
            </div>

            {/* Floor Navigation */}
            <div className="bg-white rounded-lg shadow-md border border-blue-100 p-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <SearchIcon className="h-5 w-5 text-blue-600" />
                Quick Navigation
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {sortedFloors.map((floor) => (
                  <button
                    key={floor.id}
                    onClick={() => {
                      const element = document.getElementById(
                        `floor-${floor.id}`
                      );
                      element?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className="text-left p-2 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="font-medium text-sm text-gray-900">
                      {floor.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Level {floor.level} • {floor.offices.length} offices
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Floors List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                All Floors
              </h2>
              {sortedFloors.map((floor) => (
                <div key={floor.id} id={`floor-${floor.id}`}>
                  <FloorCard floor={floor} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              Ashara Central Office - MSB • Floor Directory & Navigation
            </p>
            <p className="text-xs text-gray-500">
              For assistance, contact your respective floor head or use the
              search function above.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
