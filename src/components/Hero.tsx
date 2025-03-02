
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AuthModal from './AuthModal';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center bg-gradient-to-br from-white to-blue-50">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3')] bg-cover opacity-[0.03] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative pt-16 md:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div 
            className={`transition-all duration-700 ease-out delay-100 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="space-y-6 max-w-xl">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Connecting skills with opportunities
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
                Find skilled workers <span className="text-primary">on demand</span>
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Connect with verified professionals for all your service needs. From plumbing to carpentry, electrical work to landscaping – quality service is just a click away.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="shadow-button">
                      Find a worker
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <AuthModal initialView="signup" />
                  </DialogContent>
                </Dialog>
                
                <Button size="lg" variant="outline">
                  <a href="/register" className="flex items-center">
                    Become a worker
                  </a>
                </Button>
              </div>
              
              <div className="flex items-center pt-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                      <img 
                        src={`https://randomuser.me/api/portraits/men/${i + 30}.jpg`} 
                        alt="User avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <p className="text-sm">
                    <span className="font-medium text-primary">4.9/5</span>{" "}
                    <span className="text-muted-foreground">from 2,000+ reviews</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`transition-all duration-700 ease-out delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="aspect-video relative bg-white rounded-xl overflow-hidden shadow-card">
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-2">
                {/* Image 1 - Plumber */}
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Plumber" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Image 2 - Electrician */}
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Electrician" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Image 3 - Carpenter */}
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Carpenter" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Image 4 - Gardener */}
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Gardener" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-primary">5,000+</p>
                <p className="text-sm text-muted-foreground">Skilled Workers</p>
              </div>
              
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-primary">10,000+</p>
                <p className="text-sm text-muted-foreground">Completed Jobs</p>
              </div>
              
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">Service Categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
