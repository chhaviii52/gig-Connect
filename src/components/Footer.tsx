
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-8">
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Gig<span className="text-primary">Connect</span>
            </h2>
            <p className="text-muted-foreground mb-6">
            Linking skilled tradespeople, such as plumbers, electricians, and other professionals, with customers requiring their expertise.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">tchhavi123@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">+91 93179 25652</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">NIT Hamirpur, Himachal Pradesh</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">For Customers</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Find a Professional</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Customer Reviews</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Safety Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">For Workers</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Join as a Workers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Customer Reviews</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Explore Domains</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Income prospects</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Community Guidelines</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Workers FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Stay updated with the latest news and offers.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Cookies Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
