import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WorkerList from './components/worker';
import WRegister from './components/WRegister';
import Howitwrks from './components/Howitwrks';

// 🔹 Define User Type
type User = {
  id: string;
  email: string;
  name?: string;
};

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // 🔥 Correctly typed user state

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/context/user", { credentials: "include" });
        const data: User = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        setUser(null);
      }
    };

    checkSession();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index user={user} setUser={setUser}/>} /> {/* ✅ Pass user correctly */}
            <Route path="*" element={<NotFound />} />
            <Route path="/worker" element={<WorkerList />} />
            <Route path="/wregister" element={<WRegister />} />
            <Route path="/how-it-works" element={<Howitwrks />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
