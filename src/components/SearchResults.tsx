"use client";

import { MapPin, Building2 } from "lucide-react";
import type { Floor, Office } from "@/data/offices";

interface SearchResultsProps {
  results: { floor: Floor; office: Office }[];
  query: string;
}

export default function SearchResults({ results, query }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6 text-center">
        <div className="bg-blue-50 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Building2 className="h-8 w-8 text-blue-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Results Found
        </h3>
        <p className="text-gray-600 text-sm">
          No offices or departments match &quot;{query}&quot;. Try a different
          search term.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-1">
          Search Results for &quot;{query}&quot;
        </h3>
        <p className="text-sm text-blue-700">
          Found {results.length} result{results.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-3">
        {results.map((result, index) => (
          <div
            key={`${result.floor.id}-${result.office.room}-${index}`}
            className="bg-white rounded-lg shadow-md border border-blue-100 p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">
                    {result.office.room}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {result.floor.name}
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 text-sm mb-1">
                  {result.office.department}
                </h4>
                {result.office.description && (
                  <p className="text-xs text-gray-600 mb-2">
                    {result.office.description}
                  </p>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Level {result.floor.level}</span>
                  <span>•</span>
                  <span>
                    {result.floor.offices.length} offices on this floor
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
