import React, { useState } from "react";
import Navbar from "./Navbar";
import WorkerCard from "./WorkerCard"; // Import WorkerCard

// Sample worker data with extended list
const workers = [
  {
    id: "1",
    name: "James Wilson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    profession: "Plumber",
    rating: 4.9,
    reviewCount: 126,
    hourlyRate: 45,
    location: "San Francisco, CA",
    skills: ["Pipe Repair", "Installation", "Emergency Service"],
    availability: "Available next week",
    verified: true,
  },
  {
    id: "2",
    name: "Samantha Green",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    profession: "Electrician",
    rating: 4.7,
    reviewCount: 98,
    hourlyRate: 50,
    location: "New York, NY",
    skills: ["Wiring", "Repairs", "Circuit Installation"],
    availability: "Available now",
    verified: true,
  },
  {
    id: "3",
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    profession: "Carpenter",
    rating: 4.7,
    reviewCount: 78,
    hourlyRate: 50,
    location: "San Jose, CA",
    skills: ["Furniture", "Cabinetry", "Framing"],
    availability: "Available this weekend",
    verified: false,
  },
  {
    id: "4",
    name: "Emma Johnson",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    profession: "House Cleaner",
    rating: 4.9,
    reviewCount: 152,
    hourlyRate: 35,
    location: "Berkeley, CA",
    skills: ["Deep Cleaning", "Move-in/out", "Eco-Friendly"],
    availability: "Available today",
    verified: true,
  },
  {
    id: "5",
    name: "Robert Brown",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    profession: "Painter",
    rating: 4.6,
    reviewCount: 89,
    hourlyRate: 40,
    location: "Los Angeles, CA",
    skills: ["Interior Painting", "Exterior Painting", "Wallpaper Removal"],
    availability: "Available in 2 days",
    verified: true,
  },
  {
    id: "6",
    name: "Laura Davis",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    profession: "Gardener",
    rating: 4.8,
    reviewCount: 110,
    hourlyRate: 30,
    location: "Seattle, WA",
    skills: ["Lawn Care", "Tree Trimming", "Flower Maintenance"],
    availability: "Available next week",
    verified: false,
  },
  {
    id: "7",
    name: "James Wilson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    profession: "Plumber",
    rating: 4.9,
    reviewCount: 126,
    hourlyRate: 45,
    location: "San Francisco, CA",
    skills: ["Pipe Repair", "Installation", "Emergency Service"],
    description: "Professional plumber with 10+ years of experience. Specializing in both residential and commercial plumbing services.",
    availability: "Available next week",
    verified: true,
  },
  {
    id: "8",
    name: "Samantha Green",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    profession: "Electrician",
    rating: 4.7,
    reviewCount: 98,
    hourlyRate: 50,
    location: "New York, NY",
    skills: ["Wiring", "Repairs", "Circuit Installation"],
    description: "Expert electrician with 8+ years of experience.",
    availability: "Available now",
    verified: true,
  },
  {
    id: "9",
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    profession: "Carpenter",
    rating: 4.7,
    reviewCount: 78,
    hourlyRate: 50,
    location: "San Jose, CA",
    skills: ["Furniture", "Cabinetry", "Framing"],
    description: "Custom woodworking and general carpentry. From small repairs to complete renovations. Quality craftsmanship guaranteed.",
    availability: "Available this weekend",
    verified: false
  },
  
];

const WorkerList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter workers based on search term
  const filteredWorkers = workers.filter((worker) =>
    worker.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
    <Navbar />
  
    {/* Page Content */}
    <div className="flex flex-col items-center p-6 mt-20"> {/* Added mt-10 for more top margin */}
      {/* Search Bar */}
      <div className="w-full max-w-xl mb-6">
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
