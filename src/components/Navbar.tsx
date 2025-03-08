import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import AuthModal from "./AuthModal";


// Define User type
interface User {
  id: string;
  email: string;
  name?: string;
}


interface NavbarProps {
  user: User | null;
  setUser: (user: User | null) => void;
}
const navLinks: { path: string; label: string }[] = [
  { path: "/", label: "Home" },
  { path: "/worker", label: "Find Workers" },
  { path: "/wregister", label: "Become a Worker" },
  { path: "/how-it-works", label: "How It Works" },
];
const Navbar: React.FC<NavbarProps> = ({ user, setUser }) => {
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/context/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="text-xl md:text-2xl font-bold text-foreground hover:text-primary">
            Gig<span className="text-primary">Connect</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive(path) ? "text-primary" : "text-foreground/80"
                  }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:shadow-md">
                <User className="h-5 w-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-900">{user.name || user.email}</span>
                <button onClick={handleLogout} className="text-sm text-red-600 hover:underline ml-2">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="hidden md:flex">
                      Log in <User className="ml-1.5 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <AuthModal onAuthSuccess={setUser} />
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="hidden md:flex shadow-button">
                      Sign up
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <AuthModal initialView="signup" onAuthSuccess={setUser} />
                  </DialogContent>
                </Dialog>
              </>
            )}

            <button className="md:hidden p-2 rounded-md" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white animate-fade-in shadow-lg px-3 py-3">
          <form onSubmit={handleSearch} className="p-3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search workers..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          {["/", "/worker", "/wregister"].map((path, idx) => (
            <Link
              key={idx}
              to={path}
              className={`block px-3 py-3 rounded-md text-base font-medium ${isActive(path) ? "text-primary" : "text-foreground/80"
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {path === "/" ? "Home" : path.replace("/", "").replace("-", " ")}
            </Link>
          ))}

          {!user && (
            <div className="pt-4 flex space-x-3 px-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    Log in
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <AuthModal onAuthSuccess={setUser} />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="w-full">
                    Sign up
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <AuthModal initialView="signup" onAuthSuccess={setUser} />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;