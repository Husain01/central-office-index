export interface Office {
  room: string;
  department: string;
  description?: string;
}

export interface Floor {
  id: string;
  name: string;
  level: number;
  offices: Office[];
  head: {
    name: string;
    phone: string;
    whatsapp: string;
  };
  hasFloorPlan: boolean;
}

export const floors: Floor[] = [
  {
    id: "basement",
    name: "Basement",
    level: -1,
    offices: [
      {
        room: "Computer Lab",
        department: "ITS",
      },
      {
        room: "Activity Room",
        department: "ITS",
      },
    ],
    head: {
      name: "Mohammed bhai Pindwarawala",
      phone: "+919790718203",
      whatsapp: "+919790718203",
    },
    hasFloorPlan: true,
  },
  {
    id: "ground",
    name: "Ground Floor",
    level: 0,
    offices: [
      {
        room: "Dua Hall",
        department: "Follow-up Al Vazarat tus Saifiyah",
      },
      {
        room: "KG A",
        department: "Waaz Talaqqi",
      },
      {
        room: "KG B",
        department: "Waaz Istibsaar",
      },
      {
        room: "Nursery A",
        department: "Waaz Translation",
      },
      {
        room: "Nursery B",
        department: "Iqtebasaat Publications",
      },
    ],
    head: {
      name: "Yusuf bhai Mithai",
      phone: "+919840499521",
      whatsapp: "+919840499521",
    },
    hasFloorPlan: true,
  },
  {
    id: "first",
    name: "First Floor",
    level: 1,
    offices: [
      {
        room: "Pre-First A",
        department: "PRO",
      },
      {
        room: "Pre-First B",
        department: "Qusai bs Bethak Tanzeem",
      },
      {
        room: "Chemistry Lab",
        department: "Transport",
      },
      {
        room: "2B",
        department: "Food Hygiene",
        description: "Shabab, Fire Safety",
      },
      {
        room: "2A",
        department: "Welfare",
      },
      {
        room: "1B",
        department: "Nikah / Misaaq",
        description: "Sigatul Qaza, Sigatul Hawaij",
      },
      {
        room: "1A",
        department: "Nazafat",
      },
    ],
    head: {
      name: "Hussain Bhai Deesawala",
      phone: "+917358727982",
      whatsapp: "+917358727982",
    },
    hasFloorPlan: true,
  },
  {
    id: "second",
    name: "Second Floor",
    level: 2,
    offices: [
      {
        room: "3A",
        department: "Toloba ul Kulliyaat",
      },
      {
        room: "3B",
        department: "Talebaat ul Kulliyaat",
      },
      {
        room: "4A",
        department: "Communications - Hizbe Saifee",
      },
      {
        room: "4B",
        department: "Communications",
      },
      {
        room: "5A",
        department: "HR",
      },
      {
        room: "6A",
        department: "Mawaid",
      },
      {
        room: "7A",
        department: "Procurement",
      },
      {
        room: "8A",
        department: "Finance",
      },
    ],
    head: {
      name: "Mohammed bhai Pindwarawala",
      phone: "+919790718203",
      whatsapp: "+919790718203",
    },
    hasFloorPlan: true,
  },
  {
    id: "third",
    name: "Third Floor",
    level: 3,
    offices: [
      {
        room: "11B",
        department: "ITS",
      },
      {
        room: "5B",
        department: "ITS",
      },
      {
        room: "9B",
        department: "ITS",
      },
      {
        room: "9A",
        department: "ITS",
      },
      {
        room: "8B",
        department: "Shehzadi Ummehaani Bs Office",
      },
      {
        room: "6B",
        department: "HR",
      },
      {
        room: "10B",
        department: "Ummulkiram Bs / Arwa bs / Fatema bs",
      },
      {
        room: "10A",
        department: "Waaz Zones and Scanning",
      },
    ],
    head: {
      name: "Burhanuddin bhai Laila",
      phone: "+919962245800",
      whatsapp: "+919962245800",
    },
    hasFloorPlan: true,
  },
  {
    id: "fourth",
    name: "Fourth Floor",
    level: 4,
    offices: [
      {
        room: "12A",
        department: "PMO Zonal Coordinator",
      },
      {
        room: "12B",
        department: "Local PMO",
      },
      {
        room: "Bio Lab",
        department: "IPMO",
      },
      {
        room: "Physics Lab",
        department: "PMO Admin and Reporting",
      },
      {
        room: "11A",
        department: "Shz Taha bs Najmuddin Office",
      },
      {
        room: "Quran Room",
        department: "Executive Conference Room",
      },
    ],
    head: {
      name: "Mustafa bhai Baksha",
      phone: "+919025515987",
      whatsapp: "+919025515987",
    },
    hasFloorPlan: true,
  },
];

export const searchOffices = (
  query: string
): { floor: Floor; office: Office }[] => {
  if (!query.trim()) return [];

  const searchTerm = query.toLowerCase().trim();
  const results: { floor: Floor; office: Office }[] = [];

  floors.forEach((floor) => {
    floor.offices.forEach((office) => {
      const searchableText = `${office.room} ${office.department} ${
        office.description || ""
      }`.toLowerCase();
      if (searchableText.includes(searchTerm)) {
        results.push({ floor, office });
      }
    });
  });

  return results;
};
