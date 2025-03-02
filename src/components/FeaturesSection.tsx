
import React, { useRef, useEffect } from 'react';
import { 
  Search, Calendar, CreditCard, Star, 
  Shield, Clock, MapPin, UserCheck
} from 'lucide-react';

const features = [
  {
    icon: Search,
    title: "Search & Discovery",
    description: "Find skilled workers based on your specific needs, location, and availability."
  },
  {
    icon: UserCheck,
    title: "Verified Professionals",
    description: "All workers undergo ID verification and skill validation before joining our platform."
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Schedule appointments with just a few clicks and receive instant confirmations."
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Pay online with confidence through our secure payment processing system."
  },
  {
    icon: Star,
    title: "Review System",
    description: "Read and leave reviews to ensure quality service and build community trust."
  },
  {
    icon: Shield,
    title: "Service Guarantee",
    description: "Feel confident with our satisfaction guarantee and dispute resolution process."
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description: "Get notifications about appointment changes, worker arrival times, and job completion."
  },
  {
    icon: MapPin,
    title: "Location Tracking",
    description: "Track worker arrival with our real-time location sharing feature for transparency."
  }
];

const FeaturesSection = () => {
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    featuresRef.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      featuresRef.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            How It Works
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            A complete platform for worker-client connections
          </h2>
          <p className="text-lg text-muted-foreground">
            SkillConnect offers a seamless experience from finding the right professional to completing your project with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => featuresRef.current[index] = el}
              className="fade-up p-6 rounded-xl hover:shadow-elevation transition-all duration-300 border border-border bg-white"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
