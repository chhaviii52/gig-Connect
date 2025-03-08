import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const WorkerSignin = ({ setWorker }: { setWorker: (worker: any) => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const prefilledEmail = queryParams.get("email") || "";

  const [formData, setFormData] = useState({
    email: prefilledEmail,
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //to fetch the data from the backend to ensure whether worker is already registered or not
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/context/wsignin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: "include",
        });

        if (res.ok) {
            const workerData = await res.json();
            setWorker(workerData); // 🔹 Store worker details
            console.log("Worker data:", workerData);
            
            // 🔹 Pass worker data when navigating
            navigate("/worker-dashboard", { state: { worker: workerData.user } });

        } else {
            console.error("Sign-in failed");
        }
    } catch (error) {
        console.error("Error during sign-in:", error);
    }
};


  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">Worker Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border" required />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border" required />

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Sign In</button>
      </form>
    </div>
  );
};

export default WorkerSignin;
