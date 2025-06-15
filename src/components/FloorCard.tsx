"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Phone,
  Map,
  Building2,
  Users,
} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import type { Floor } from "@/data/offices";

interface FloorCardProps {
  floor: Floor;
  isExpanded?: boolean;
  onToggleExpanded?: (floorId: string, expanded: boolean) => void;
}

export default function FloorCard({
  floor,
  isExpanded = false,
  onToggleExpanded,
}: FloorCardProps) {
  const [internalExpanded, setInternalExpanded] = useState(isExpanded);

  // Use controlled state if parent provides onToggleExpanded, otherwise use internal state
  const expanded = onToggleExpanded ? isExpanded : internalExpanded;

  const handleToggleExpanded = () => {
    const newExpanded = !expanded;
    if (onToggleExpanded) {
      onToggleExpanded(floor.id, newExpanded);
    } else {
      setInternalExpanded(newExpanded);
    }
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self");
  };

  const handleWhatsApp = (phone: string) => {
    const message = encodeURIComponent(
      `Hello, I need assistance regarding ${floor.name}`
    );
    window.open(
      `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${message}`,
      "_blank"
    );
  };

  const handleFloorPlan = () => {
    // Placeholder for floor plan functionality
    alert(`Floor plan for ${floor.name} will be available soon!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden mb-4">
      <div
        className="p-4 cursor-pointer hover:bg-blue-50 transition-colors"
        onClick={handleToggleExpanded}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {floor.name}
              </h3>
              <p className="text-sm text-gray-500">
                {floor.offices.length} offices
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              Level {floor.level}
            </span>
            {expanded ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-blue-100">
          {/* Floor Head Contact */}
          <div className="p-4 bg-blue-50 border-b border-blue-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Floor Head</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCall(floor.head.phone)}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                  title="Call"
                >
                  <Phone className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleWhatsApp(floor.head.whatsapp)}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white p-2 rounded-lg transition-colors"
                  title="WhatsApp"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                </button>
                {floor.hasFloorPlan && (
                  <button
                    onClick={handleFloorPlan}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                    title="View Floor Plan"
                  >
                    <Map className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <p className="text-sm text-blue-800">{floor.head.name}</p>
            <p className="text-xs text-blue-600">{floor.head.phone}</p>
          </div>

          {/* Offices List */}
          <div className="p-4">
            <div className="grid gap-3">
              {floor.offices.map((office, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">
                          {office.room}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900 text-sm">
                        {office.department}
                      </h4>
                      {office.description && (
                        <p className="text-xs text-gray-600 mt-1">
                          {office.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
