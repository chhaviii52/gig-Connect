import { useState } from "react";
import axios from "axios";

const ChatBotAI = ({ onClose }: { onClose: () => void }) => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setResponses((prev) => [...prev, `You: ${message}`]);
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/context/chat",
        { message },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Chatbot Response:", res.data);
      setResponses((prev) => [...prev, `Apka Sewag: ${res.data.reply}`]);
    } catch (error) {
      console.error("❌ Chatbot Error:", error.response?.data || error.message);
      setResponses((prev) => [...prev, "🙏 Apka Sewak: Error getting response"]);
    }

    setMessage("");
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]"
      onClick={onClose} // ✅ Clicking outside closes chat
    >
      <div
        className="w-[600px] h-[700px] bg-white shadow-2xl rounded-xl p-6 flex flex-col relative"
        onClick={(e) => e.stopPropagation()} // ✅ Prevents closing when clicking inside chat
      >
        {/* ✅ Small Cross Button at the Top */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition p-1 rounded-full text-xs border border-gray-300 hover:bg-gray-200"
        >
          ✖
        </button>

        {/* Chatbot Header with "Clear Chat" Button */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Chatbot AI</h2>

          {/* ✅ Clear Chat Button */}
          <button
            onClick={() => setResponses([])}
            className="text-red-500 hover:text-red-700 transition text-sm"
          >
            Clear Chat
          </button>
        </div>

        {/* Chat Display */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100 rounded-lg mt-4">
          {responses.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-md max-w-[80%] ${
                msg.startsWith("You:") ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-gray-900 self-start"
              }`}
            >
              {msg}
            </div>
          ))}
          {loading && <p className="text-gray-500 italic">Generating response...</p>}
        </div>

        {/* Chat Input */}
        <div className="flex items-center gap-2 pt-4 border-t">
          <input
            type="text"
            className="border p-3 flex-1 rounded-lg"
            placeholder="Ask something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotAI;
