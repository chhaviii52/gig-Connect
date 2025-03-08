import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion ,AnimatePresence} from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ChatBotAI from "./chatbotapi";
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  profession: z.string().min(1, "Please select a profession"),
  skills: z.string().min(1, "Please enter skills"),
  hourlyRate: z.string().min(1, "Hourly rate is required"),
});

const inputField =
  "w-full p-3 bg-white/80 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition";
const dropdownField =
  "w-full p-3 bg-white/80 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition";
const errorText = "text-red-500 text-sm mt-1";

type FormData = z.infer<typeof formSchema>;

const WorkerRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("http://localhost:5000/api/context/wregister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    
      const result = await response.json();
      console.log("Response Status:", response.status);  // Log status
      console.log("Response Data:", result);  // Log full response
    
      if (!response.ok) throw new Error(result.message || "Something went wrong");
    
      setMessage("✅ Registration successful!");
      navigate(`/worker-signin?email=${encodeURIComponent(data.email)}`);
    } catch (error: any) {
      console.error("Error Occurred:", error); // Log exact error
      setMessage(`❌ Error: User already exist OR ${error.message}`);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-xl border border-gray-300"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Worker Registration
        </h2>

        {message ? (
          <div className="text-center">
            <p className="font-medium py-2">{message}</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Go to Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <input {...register("name")} className={inputField} />
              {errors.name && <p className={errorText}>{errors.name.message}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-700">Email</label>
              <input {...register("email")} type="email" className={inputField} />
              {errors.email && <p className={errorText}>{errors.email.message}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-700">Password</label>
              <input {...register("password")} type="password" className={inputField} />
              {errors.password && <p className={errorText}>{errors.password.message}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-700">Phone</label>
              <input {...register("phone")} type="tel" className={inputField} />
              {errors.phone && <p className={errorText}>{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-700">Profession</label>
              <Controller
                name="profession"
                control={control}
                render={({ field }) => (
                  <select {...field} className={dropdownField}>
                    <option value="">Select Profession</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Carpenter">Carpenter</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Painting">Painting</option>
                    <option value="Moving">Moving</option>
                    <option value="Mason">Mason</option>
                  </select>
                )}
              />
              {errors.profession && <p className={errorText}>{errors.profession.message}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-700">Skills</label>
              <input {...register("skills")} className={inputField} />
              {errors.skills && <p className={errorText}>{errors.skills.message}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-700">Hourly Rate (₹)</label>
              <input {...register("hourlyRate")} type="number" className={inputField} />
              {errors.hourlyRate && <p className={errorText}>{errors.hourlyRate.message}</p>}
            </div>

            <div className="col-span-2 flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className={`w-full md:w-1/2 py-2 rounded-lg shadow-md transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
              >
                {loading ? "Submitting..." : "Register"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => navigate("/worker-signin")}
                className="w-full md:w-1/2 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-md transition"
              >
                Sign In
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
       {/* 🔹 Chatbot Button */}
       <button
        onClick={() => setShowChatbot(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        💬 Chat
      </button>

      {/* 🔹 Chatbot UI */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]"
          >
            <div className="w-[600px] h-[700px] bg-white border border-gray-300 shadow-2xl rounded-xl p-6 relative flex flex-col">
              
              {/* 🔹 Close Button */}
              <button
                onClick={() => setShowChatbot(false)}
                className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 transition"
              >
                ✖
              </button>

              {/* 🔹 Greeting Text */}
              <div className="text-center text-xl font-semibold text-gray-800 mb-4">
                🙏 Namaste! Mai aapki kya madad kar sakta hoon?
              </div>

              {/* 🔹 Chatbot Component */}
              <div className="flex-1 overflow-hidden">
                {showChatbot && <ChatBotAI onClose={() => setShowChatbot(false)} />}
              </div>
            </div>
          </motion.div>
          )}
          </AnimatePresence>
    
    </div>
  );
};

export default WorkerRegistration;
