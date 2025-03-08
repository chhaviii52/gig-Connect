import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import WorkerDetailsForm from "./workDetailForm";
type Worker = {
  name: string;
  email: string;
  profession: string;
  location: string;
  hourlyRate: number;
  skills: string[];
  coordinates?: {
    type: "Point";
    coordinates: [number, number]; // Longitude, Latitude
  };
};

type WorkerCredentials = {
  workExperience: { company: string; role: string; years: number }[];
  workHours: { startTime: string; endTime: string };
  govtCertifications: { name: string; fileUrl: string; issuedBy: string; issueDate: string }[];
  paymentRange: { minRate: number; maxRate: number };
  location: string; // 🔹 Just a string, not a Mongoose schema object
  coordinates: {
    type: "Point"; // 🔹 Keep the GeoJSON type
    coordinates: [number, number]; // 🔹 Array format: [longitude, latitude]
  };
};


const WorkerDashboard = () => {
  const [refresh, setRefresh] = useState(false);

  const [worker, setWorker] = useState<Worker | null>(null);
  const [credentials, setCredentials] = useState<WorkerCredentials | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // 🔹 Fetch Worker Data (POST /wData)
  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/context/wDat`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch worker data");
        const data = await res.json();
        setWorker(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkerData();
  }, []);

  // 🔹 Fetch Worker Credentials (GET /showData)
  useEffect(() => {
    if (worker) {
      console.log("🔍 Fetching credentials for worker:", worker);
      const fetchCredentials = async () => {
        try {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/api/context/showData`, {
            method: "GET",
            credentials: "include",
          });
          if (!res.ok) throw new Error("No credentials found");
          const data = await res.json();
          console.log("✅ Received Credentials:", data); // 🔹 Debugging
          setCredentials(data);
          setShowForm(false);
        } catch (err) {
          console.error("❌ Error fetching credentials:", err);
          setShowForm(true);
        }
      };
      fetchCredentials();
    }
  }, [worker, refresh]); // 🔹 Added `refresh` to trigger updates


  if (loading) return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  if (!worker) return <p className="text-center text-red-500 mt-10">No worker data found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <motion.div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">{worker.name}</h2>
            <p className="text-gray-500">{worker.profession}</p>
          </div>
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${worker.name}`}
            alt="Avatar"
            className="w-16 h-16 rounded-full border-2 border-blue-400 shadow-md"
          />
        </div>

        {/* Left Section: User Profile */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="text-gray-600"><strong>Email:</strong> {worker.email}</p>
          {/* 🔹 Certification Status */}
          <p className="text-gray-600">
            <strong>Certification Status:</strong> {credentials?.govtCertifications?.length ? (
              <span className="text-green-600 font-semibold">Certified ✅</span>
            ) : (
              <span className="text-red-500 font-semibold">Uncertified ❌</span>
            )}
          </p>
          {credentials && credentials.coordinates && Array.isArray(credentials.coordinates.coordinates) && credentials.coordinates.coordinates.length === 2 ? (
            <>
              <p className="text-gray-600">
                <strong>Location:</strong> {credentials.location} <br />
                <strong>Coordinates:</strong> {credentials.coordinates.coordinates[1]}, {credentials.coordinates.coordinates[0]}
              </p>

            </>
          ) : (
            <p className="text-gray-500">Coordinates not available</p>
          )}


          <p className="text-gray-600"><strong>Skills:</strong> {worker.skills?.join(", ") || "No skills listed"}</p>
        </div>

        {/* Enter Details Section */}
        <h3 className="text-xl font-semibold mb-3">Details:</h3>

        {!showForm ? (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Credentials</h3>

            {/* 🔹 Work Experience */}
            <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Work Experience</h4>
              {credentials?.workExperience?.length ? (
                credentials.workExperience.map((exp, index) => (
                  <div key={index} className="p-2 border-b border-gray-300 last:border-b-0">
                    <p><strong>Company:</strong> {exp.company || "N/A"}</p>
                    <p><strong>Role:</strong> {exp.role || "N/A"}</p>
                    <p><strong>Years:</strong> {exp.years || "0"} yrs</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No experience added</p>
              )}
            </div>

            {/* 🔹 Work Hours */}
            <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Work Hours</h4>
              <p><strong>Start Time:</strong> {credentials?.workHours?.startTime || "N/A"}</p>
              <p><strong>End Time:</strong> {credentials?.workHours?.endTime || "N/A"}</p>
            </div>

            {/* 🔹 Payment Range */}
            <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Payment Range</h4>
              <p><strong>Minimum Rate:</strong> ₹{credentials?.paymentRange?.minRate || 0}</p>
              <p><strong>Maximum Rate:</strong> ₹{credentials?.paymentRange?.maxRate || 0}</p>
            </div>

            {/* 🔹 Government Certifications */}
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Certifications</h4>
              {credentials?.govtCertifications?.length ? (
                credentials.govtCertifications.map((cert, index) => (
                  <div key={index} className="p-2 border-b border-gray-300 last:border-b-0">
                    <p><strong>Name:</strong> {cert.name}</p>
                    <p><strong>Issued By:</strong> {cert.issuedBy}</p>
                    <p><strong>Issue Date:</strong> {cert.issueDate}</p>
                    {cert.fileUrl && (
                      <a href={cert.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        View Certificate
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-red-500 font-semibold">Uncertified Worker</p>
              )}
            </div>
          </div>

        ) : (
          <div>

            <WorkerDetailsForm setRefresh={setRefresh} />
          </div>
        )}

        {/* Note at the Bottom */}
        <p className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg">
          If you are not certified, complete small projects and get feedback to boost your profile.
        </p>
      </motion.div>
    </div>
  );
};

export default WorkerDashboard;
