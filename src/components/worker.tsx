import React, { useState } from "react";
import Navbar from "./Navbar";
import WorkerCard from "./WorkerCard"; // Import WorkerCard

const workers = [
  {
    id: "1",
    name: "Ramesh Sharma",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    profession: "Plumber",
    rating: 4.8,
    reviewCount: 102,
    hourlyRate: 400,
    location: "Hamirpur, HP",
    skills: ["Pipe Repair", "Leak Fixing", "Sanitary Installations"],
    availability: "Available this weekend",
    verified: true,
  },
  {
    id: "2",
    name: "Sunita Verma",
    avatar: "https://randomuser.me/api/portraits/women/40.jpg",
    profession: "Electrician",
    rating: 4.7,
    reviewCount: 89,
    hourlyRate: 450,
    location: "Nadaun, HP",
    skills: ["Wiring", "Fuse Repairs", "Solar Panel Installation"],
    availability: "Available today",
    verified: true,
  },
  {
    id: "3",
    name: "Deepak Thakur",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    profession: "Carpenter",
    rating: 4.9,
    reviewCount: 120,
    hourlyRate: 500,
    location: "Bilaspur, HP",
    skills: ["Furniture Making", "Wood Polishing", "Custom Cabinetry"],
    availability: "Available next week",
    verified: true,
  },
  {
    id: "4",
    name: "Pooja Sharma",
    avatar: "https://randomuser.me/api/portraits/women/35.jpg",
    profession: "House Cleaner",
    rating: 4.8,
    reviewCount: 140,
    hourlyRate: 350,
    location: "Kangra, HP",
    skills: ["Deep Cleaning", "Eco-Friendly Products", "Move-in/Move-out Cleaning"],
    availability: "Available now",
    verified: false,
  },
  {
    id: "5",
    name: "Rajiv Mehta",
    avatar: "https://randomuser.me/api/portraits/men/37.jpg",
    profession: "Painter",
    rating: 4.6,
    reviewCount: 80,
    hourlyRate: 400,
    location: "Una, HP",
    skills: ["Wall Painting", "Exterior Coatings", "Wood Polish"],
    availability: "Available in 3 days",
    verified: true,
  },
  {
    id: "6",
    name: "Sandeep Chauhan",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    profession: "Gardener",
    rating: 4.7,
    reviewCount: 110,
    hourlyRate: 300,
    location: "Mandi, HP",
    skills: ["Lawn Care", "Plant Maintenance", "Tree Trimming"],
    availability: "Available next weekend",
    verified: false,
  },
  {
    id: "5",
    name: "Pawan Kumar",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    profession: "Painter",
    rating: 4.5,
    reviewCount: 90,
    hourlyRate: 35,
    location: "Una, HP",
    skills: ["Interior Painting", "Exterior Painting", "Wallpaper Removal"],
    availability: "Available next week",
    verified: true,
  },
  {
    id: "6",
    name: "Neha Rana",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    profession: "Gardener",
    rating: 4.8,
    reviewCount: 115,
    hourlyRate: 30,
    location: "Mandi, HP",
    skills: ["Lawn Care", "Tree Trimming", "Flower Maintenance"],
    availability: "Available now",
    verified: false,
  }
];

const WorkerList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  // Filter workers based on search term and location
  const filteredWorkers = workers.filter((worker) =>
    worker.profession.toLowerCase().includes(searchTerm.toLowerCase()) &&
    worker.location.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      {/* Page Content */}
      <div className="flex flex-col items-center p-6 mt-20">
        {/* Search Filters */}
        <div className="w-full max-w-xl mb-6 space-y-4">
          {/* Location Input */}
          <input
            type="text"
            placeholder="Enter Location (e.g. New York, San Francisco)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Profession Input */}
          <input
            type="text"
            placeholder="Search by profession (e.g. plumber, electrician)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Worker List */}
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredWorkers.length > 0 ? (
              filteredWorkers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))
            ) : (
              <p className="text-gray-500 text-center w-full col-span-full">
                No workers found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerList;
