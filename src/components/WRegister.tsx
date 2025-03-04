import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  skills: z.string().min(1, "Please select a skill"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
});

const inputField = "w-full p-3 bg-white/80 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition";
const dropdownField = "w-full p-3 bg-white/80 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition";
const errorText = "text-red-500 text-sm mt-1";

type FormData = z.infer<typeof formSchema>;

const AnimatedForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      skills: "",
      address: "",
      city: "",
      state: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("http://localhost:5000/api/context/WRegister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Something went wrong");

      setMessage("✅ Registration successful!");
      reset(); // Clear form after success
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 mt-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto p-6 bg-white shadow-2xl rounded-xl border border-gray-300"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Worker Registration</h2>
        
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
              <label className="block font-medium text-gray-700">Skills</label>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <select {...field} className={dropdownField}>
                    <option value="">Select a skill</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="painting">Painting</option>
                  </select>
                )}
              />
              {errors.skills && <p className={errorText}>{errors.skills.message}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-700">Address</label>
              <input {...register("address")} className={inputField} />
              {errors.address && <p className={errorText}>{errors.address.message}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-700">City</label>
              <input {...register("city")} className={inputField} />
              {errors.city && <p className={errorText}>{errors.city.message}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-700">State</label>
              <input {...register("state")} className={inputField} />
              {errors.state && <p className={errorText}>{errors.state.message}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg shadow-md transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {loading ? "Submitting..." : "Register"}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default AnimatedForm;