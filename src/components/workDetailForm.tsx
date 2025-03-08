import { useState } from "react";
type WorkerDetailsFormProps = {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
const WorkerDetailsForm: React.FC<WorkerDetailsFormProps> = ({ setRefresh }) => {
    const [formData, setFormData] = useState({
        workExperience: [{ company: "", role: "", years: "" }],
        workHours: { startTime: "", endTime: "" },
        govtCertifications: [{ name: "", fileUrl: "", issuedBy: "", issueDate: "" }],
        paymentRange: { minRate: "", maxRate: "" },
        location: "",
        coordinates: { lat: null, lon: null },
    });
    const formattedData = {
        ...formData,
        workExperience: formData.workExperience.map((exp) => ({
            ...exp,
            years: Number(exp.years) // 🔹 Convert to Number
        })),
        workHours: {
            startTime: formData.workHours.startTime || "09:00 AM",
            endTime: formData.workHours.endTime || "06:00 PM"
        },
        paymentRange: {
            minRate: Number(formData.paymentRange.minRate) || 800, // 🔹 Convert to Number
            maxRate: Number(formData.paymentRange.maxRate) || 1200 // 🔹 Convert to Number
        },
        coordinates: {
            type: "Point", // 🔹 Ensure GeoJSON format
            coordinates: [formData.coordinates.lon, formData.coordinates.lat] // 🔹 [longitude, latitude]
        }
    };

    console.log("📤 Sending Data:", JSON.stringify(formattedData, null, 2));
    const fetchCoordinates = async () => {
        if (!formData.location) return;
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.location)}`);
            const data = await res.json();
            console.log("📍 Location Found:", data[0].lat, data[0].lon);
            if (data.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    coordinates: { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) },
                }));
                console.log("📍 Location Found:", data[0].lat, data[0].lon);
            } else {
                alert("Location not found. Please enter a valid location.");
            }
        } catch (error) {
            console.error("❌ Error fetching coordinates:", error);
        }
    }
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: string,
        subField?: string,
        index?: number
    ) => {
        if (subField !== undefined && index !== undefined) {
            const updatedField = [...(formData as any)[field]];
            updatedField[index][subField] = e.target.value;
            setFormData((prev) => ({ ...prev, [field]: updatedField }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [field]: e.target.value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("📤 Sending Data:", JSON.stringify(formData, null, 2));
        try {
            const res = await fetch("http://localhost:5000/api/context/workerCredentials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formattedData),
            });

            if (!res.ok) throw new Error("Failed to save data");

            console.log("Form data successfully saved.");

            // 🔹 Call the parent function to update state in WorkerDashboard.tsx
            setRefresh((prev) => !prev);

            alert("Credentials saved successfully!");
        } catch (err) {
            console.error("Error saving credentials:", err);
            alert("Error saving credentials.");
        }
    };


    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Enter Worker Details</h3>

            {/* 🔹 Work Experience Section */}
            <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Work Experience</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block font-medium text-gray-600">Company</label>
                        <input type="text" className="input w-full" placeholder="Company" onChange={(e) => handleChange(e, "workExperience", "company", 0)} />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-600">Role</label>
                        <input type="text" className="input w-full" placeholder="Role" onChange={(e) => handleChange(e, "workExperience", "role", 0)} />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-600">Years</label>
                        <input type="number" className="input w-full" placeholder="Years" onChange={(e) => handleChange(e, "workExperience", "years", 0)} />
                    </div>
                </div>
            </div>

            <hr className="border-t border-gray-300" />

            {/* 🔹 Work Hours Section */}
            <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Work Hours</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium text-gray-600">Start Time</label>
                        <input type="text" className="input w-full" placeholder="Start Time" onChange={(e) => handleChange(e, "workHours", "startTime")} />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-600">End Time</label>
                        <input type="text" className="input w-full" placeholder="End Time" onChange={(e) => handleChange(e, "workHours", "endTime")} />
                    </div>
                </div>
            </div>

            <hr className="border-t border-gray-300" />

            {/* 🔹 Government Certifications Section */}
            <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Government Certifications</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block font-medium text-gray-600">Certification Name</label>
                        <input type="text" className="input w-full" placeholder="Name" onChange={(e) => handleChange(e, "govtCertifications", "name", 0)} />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-600">Issued By</label>
                        <input type="text" className="input w-full" placeholder="Issued By" onChange={(e) => handleChange(e, "govtCertifications", "issuedBy", 0)} />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-600">Issue Date</label>
                        <input type="date" className="input w-full" onChange={(e) => handleChange(e, "govtCertifications", "issueDate", 0)} />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-600">Upload Certificate</label>
                        <input type="file" className="input w-full" onChange={(e) => handleChange(e, "govtCertifications", "fileUrl", 0)} />
                    </div>
                </div>
            </div>

            <hr className="border-t border-gray-300" />

            {/* 🔹 Payment Range Section */}
            <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Payment Range</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium text-gray-600">Min Rate (₹)</label>
                        <input type="number" className="input w-full" placeholder="Min Rate" onChange={(e) => handleChange(e, "paymentRange", "minRate")} />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-600">Max Rate (₹)</label>
                        <input type="number" className="input w-full" placeholder="Max Rate" onChange={(e) => handleChange(e, "paymentRange", "maxRate")} />
                    </div>
                </div>
            </div>
            {/* 🔹 Location Input */}
            <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Location</h4>
                <input
                    type="text"
                    className="input w-full"
                    placeholder="Enter City, State (e.g., Kasol, Himachal Pradesh)"
                    value={formData.location}
                    onChange={(e) => handleChange(e, "location")}
                />
                <button type="button" onClick={fetchCoordinates} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                    Get Coordinates
                </button>
                {formData.coordinates.lat && (
                    <p className="text-green-600 mt-2">Coordinates: {formData.coordinates.lat}, {formData.coordinates.lon}</p>
                )}
            </div>

            <button type="submit" className="w-full mt-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                Submit
            </button>
        </form>
    );
};


export default WorkerDetailsForm;
