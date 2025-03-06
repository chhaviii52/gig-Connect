import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type Worker = {
  name: string;
  email: string;
  profession: string;
  location: string;
  hourlyRate: number;
  skills: string[];
};

const WorkerDashboard = ({ worker }: { worker: Worker | null }) => {
  const navigate = useNavigate();
  const [localWorker, setLocalWorker] = useState<Worker | null>(worker);
  const [loading, setLoading] = useState(!worker);
  const [error, setError] = useState<string | null>(null);

  // Fetch worker data if not provided as a prop
  useEffect(() => {
    if (!worker) {
      const fetchWorkerData = async () => {
        try {
          const res = await fetch("http://localhost:5000/apicontext/wData", {
            credentials: "include",
          });

          if (!res.ok) {
            throw new Error("Failed to fetch worker data");
          }

          const data = await res.json();
          setLocalWorker(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchWorkerData();
    } else {
      setLoading(false);
    }
  }, [worker]);

  // Redirect to sign-in if worker is not logged in
  useEffect(() => {
    if (!loading && !localWorker) {
      navigate("/worker-signin");
    }
  }, [localWorker, loading, navigate]);

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!localWorker) return null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white rounded-lg shadow-xl p-6 border border-gray-200"
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-400 shadow-md">
            <img 
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${localWorker.name}`} 
              alt="Profile"
              className="w-full h-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">{localWorker.name}</h2>
          <p className="text-gray-500">{localWorker.profession}</p>
        </div>

        {/* Worker Details */}
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-gray-600"><strong>Email:</strong> {localWorker.email}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-gray-600"><strong>Location:</strong> {localWorker.location}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-gray-600"><strong>Hourly Rate:</strong> 
              <span className="text-blue-600 font-semibold"> ${localWorker.hourlyRate}</span>
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-gray-600"><strong>Skills:</strong> 
              <span className="text-green-600 font-semibold"> {localWorker.skills?.join(", ") || "No skills listed"}</span>
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={() => navigate("/worker-edit")}
          >
            Edit Profile
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkerDashboard;
