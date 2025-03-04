
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MenuIcon, X, Search, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the page has been scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-foreground transition-colors duration-200 hover:text-primary"
          >
            Gig<span className="text-primary">Connect</span>
          </Link>

          

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-foreground/80'
                }`}
            >
              Home
            </Link>
            <Link
              to="/worker"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/worker') ? 'text-primary' : 'text-foreground/80'
                }`}
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              Find Workers
            </Link>
            <Link
              to="/wregister"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/register') ? 'text-primary' : 'text-foreground/80'
                }`}
            >
              Become a Worker
            </Link>
            <Link
              to="/how-it-works"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/how-it-works') ? 'text-primary' : 'text-foreground/80'
                }`}
            >
              How It Works
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="hidden md:flex">
                  Log in <User className="ml-1.5 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <AuthModal />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="hidden md:flex shadow-button">
                  Sign up
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <AuthModal initialView="signup" />
              </DialogContent>
            </Dialog>

            {/* Mobile menu button */}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white animate-fade-in shadow-elevation">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="p-3">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search workers..."
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            <Link
              to="/"
              className={`block px-3 py-3 rounded-md text-base font-medium ${isActive('/') ? 'text-primary' : 'text-foreground/80'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`block px-3 py-3 rounded-md text-base font-medium ${isActive('/search') ? 'text-primary' : 'text-foreground/80'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Workers
            </Link>
            <Link
              to="/register"
              className={`block px-3 py-3 rounded-md text-base font-medium ${isActive('/register') ? 'text-primary' : 'text-foreground/80'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Become a Worker
            </Link>
            <Link
              to="/how-it-works"
              className={`block px-3 py-3 rounded-md text-base font-medium ${isActive('/how-it-works') ? 'text-primary' : 'text-foreground/80'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <div className="pt-4 flex space-x-3 px-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    Log in
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <AuthModal />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="w-full">
                    Sign up
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <AuthModal initialView="signup" />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
