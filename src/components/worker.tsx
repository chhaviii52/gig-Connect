import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import WorkerCard from "./WorkerCard";
import { useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"; // ✅ Import Dialog components
import AuthModal from "./AuthModal";
import { Button } from "@/components/ui/button";
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

type User = {
  id: string;
  email: string;
  name?: string;
};

type WorkerListProps = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const WorkerList: React.FC<WorkerListProps> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [listening, setListening] = useState(false); // ✅ Controls the dialog visibility

  const startVoiceRecognition = (setFunction: (text: string) => void) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    setListening(true); // ✅ Show "Listening..." popup
    recognition.start();

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = event.results[0][0].transcript.trim();
      if (transcript.endsWith(".")) {
        transcript = transcript.slice(0, -1);
      }
      setFunction(transcript);
      setListening(false); // ✅ Close dialog after recognition
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event);
      setListening(false); // ✅ Close dialog on error
    };
  };

  const filteredWorkers = workers.filter(
    (worker) =>
      (searchTerm === "" || worker.profession.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (location === "" || worker.location.toLowerCase().includes(location.toLowerCase()))
  );

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar user={user} setUser={setUser} />

      {user ? (
        <div className="flex flex-col items-center p-6 mt-20">
          <div className="w-full max-w-xl mb-6 space-y-4">
            <div className="relative flex items-center">
              <label className="mr-2 text-gray-700 font-medium">Location:</label>
              <input
                type="text"
                placeholder="Enter Location (e.g. Hamirpur, Nadaun)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <Mic
                className="absolute right-3 text-gray-500 cursor-pointer hover:text-blue-500"
                size={24}
                onClick={() => startVoiceRecognition(setLocation)}
              />
            </div>

            <div className="relative flex items-center">
              <label className="mr-2 text-gray-700 font-medium">Profession:</label>
              <input
                type="text"
                placeholder="Search by profession (e.g. plumber, electrician)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <Mic
                className="absolute right-3 text-gray-500 cursor-pointer hover:text-blue-500"
                size={24}
                onClick={() => startVoiceRecognition(setSearchTerm)}
              />
            </div>
          </div>

          <div className="w-full max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredWorkers.length > 0 ? (
                filteredWorkers.map((worker) => <WorkerCard key={worker.id} worker={worker} />)
              ) : (
                <p className="text-gray-500 text-center w-full col-span-full">No workers found.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[80vh]">
          <p className="text-center text-gray-600 text-2xl font-semibold">
            Please{" "}
            <Dialog>
              <DialogTrigger asChild>
                <span className="text-blue-500 cursor-pointer hover:underline">
                  sign in
                </span>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <AuthModal initialView="signup" onAuthSuccess={setUser} />
              </DialogContent>
            </Dialog>{" "}
            to view available workers.
          </p>
        </div>
      )}

      {/* ✅ Listening Dialog with Blinking Mic */}
      <Dialog open={listening} onOpenChange={setListening}>
        <DialogContent className="sm:max-w-xs flex flex-col items-center p-6">
          <div className="text-lg font-semibold text-gray-800">Listening...</div>
          {/* ✅ Blinking Mic Icon */}
          <Mic size={50} className="text-red-500 animate-pulse mt-3" />
          <Button variant="ghost" onClick={() => setListening(false)} className="mt-4 text-red-500">
            Cancel
          </Button>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default WorkerList;