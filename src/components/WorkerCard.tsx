import { useState } from 'react';
import { Star, MapPin, Calendar, ChevronRight, Check, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export interface WorkerData {
  id: string;
  name: string;
  avatar: string;
  profession: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  location: string;
  skills: string[];
  description: string;
  availability: string;
  verified: boolean;
}

interface WorkerCardProps {
  worker: WorkerData;
  className?: string;
}

const WorkerCard = ({ worker, className }: WorkerCardProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  const handleBooking = () => {
    // Simulate booking process
    setTimeout(() => {
      setBookingSuccess(true);
    }, 1000);
  };

  return (
    <div className={cn("rounded-xl border border-border bg-white shadow-smooth hover:shadow-elevation transition-all duration-300", className)}>
      <div className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border border-border">
            <AvatarImage src={worker.avatar} alt={worker.name} />
            <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold truncate">{worker.name}</h3>
              {worker.verified && (
                <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  Verified
                </Badge>
              )}
            </div>
            
            <p className="text-muted-foreground">{worker.profession}</p>
            
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="ml-1 font-medium">{worker.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground ml-1">({worker.reviewCount})</span>
              </div>
              <div className="mx-2 h-1 w-1 rounded-full bg-muted-foreground"></div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                {worker.location}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {worker.skills.slice(0, 3).map((skill, i) => (
              <Badge key={i} variant="secondary" className="bg-skill text-skill-foreground">
                {skill}
              </Badge>
            ))}
            {worker.skills.length > 3 && (
              <Badge variant="outline" className="text-muted-foreground">
                +{worker.skills.length - 3} more
              </Badge>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {worker.description}
          </p>
          
          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="text-lg font-bold">₹{worker.hourlyRate}/hr</p>
              <p className="text-xs text-muted-foreground">{worker.availability}</p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="group">
                  Book now
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Book {worker.name}</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Select Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Job Description
                    </label>
                    <textarea 
                      className="w-full h-24 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Describe what you need help with..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 rounded-lg bg-muted">
                    <Button onClick={handleBooking}>Buy Time</Button>
                    <Button variant="outline" className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" /> Chat
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;