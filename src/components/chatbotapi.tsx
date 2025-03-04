import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChatBotAI = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);

  const sendMessage = async () => {
    if (!query.trim()) return;

    setMessages([...messages, { text: query, sender: "user" }]);
    setQuery("");

    try {
      const res = await fetch("http://localhost:5000/api/context/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      console.log("API Response:", data); // Debugging line
      if (data && data.reply) {
        setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
      } else {
        console.error("Invalid response format:", data);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto border p-4 rounded-lg shadow-md">
      <div className="h-64 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded-md ${msg.sender === "user" ? "bg-blue-200" : "bg-gray-200"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask me anything..." />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default ChatBotAI;
