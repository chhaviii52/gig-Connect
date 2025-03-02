
import { useState } from 'react';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "Cleaning",
  "Landscaping",
  "Moving",
  "HVAC",
  "Roofing",
  "Flooring"
];

interface SearchFiltersProps {
  onSearch: (filters: any) => void;
  className?: string;
}

const SearchFilters = ({ onSearch, className }: SearchFiltersProps) => {
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const handleSearch = () => {
    onSearch({
      query,
      location,
      priceRange,
      categories: selectedCategories,
      verifiedOnly
    });
  };
  
  const clearFilters = () => {
    setQuery('');
    setLocation('');
    setPriceRange([0, 100]);
    setSelectedCategories([]);
    setVerifiedOnly(false);
  };

  return (
    <div className={className}>
      <div className="bg-white rounded-xl shadow-smooth border border-border p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for a service (e.g. plumber, electrician)"
                className="pl-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full lg:w-72">
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Location"
                className="pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full lg:w-auto flex space-x-2">
            <Button onClick={handleSearch} className="flex-1">Search</Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden"
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Filter badges */}
        {(selectedCategories.length > 0 || verifiedOnly || priceRange[0] > 0 || priceRange[1] < 100) && (
          <div className="flex flex-wrap gap-2 mt-4 pb-1">
            {selectedCategories.map(category => (
              <Badge 
                key={category}
                variant="secondary"
                className="flex items-center gap-1 pl-2 pr-1"
              >
                {category}
                <button 
                  className="rounded-full p-0.5 hover:bg-primary-foreground" 
                  onClick={() => handleCategoryToggle(category)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            
            {verifiedOnly && (
              <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1">
                Verified Only
                <button 
                  className="rounded-full p-0.5 hover:bg-primary-foreground" 
                  onClick={() => setVerifiedOnly(false)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {(priceRange[0] > 0 || priceRange[1] < 100) && (
              <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1">
                ${priceRange[0]} - ${priceRange[1]}/hr
                <button 
                  className="rounded-full p-0.5 hover:bg-primary-foreground" 
                  onClick={() => setPriceRange([0, 100])}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            <Button variant="link" size="sm" className="text-xs h-7 px-2" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}
        
        {/* Desktop filters */}
        <div className="hidden lg:flex lg:flex-wrap gap-x-6 gap-y-4 pt-6 border-t border-border mt-6">
          <div className="w-60">
            <Label className="text-sm font-medium mb-2 block">Categories</Label>
            <Select
              onValueChange={(value) => {
                if (value && !selectedCategories.includes(value)) {
                  setSelectedCategories([...selectedCategories, value]);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-60">
            <Label className="text-sm font-medium mb-2 block">Price Range ($/hr)</Label>
            <div className="px-2">
              <Slider
                value={priceRange}
                min={0}
                max={100}
                step={5}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 pt-8">
            <Checkbox 
              id="verified" 
              checked={verifiedOnly}
              onCheckedChange={(checked) => {
                setVerifiedOnly(checked === true);
              }}
            />
            <label
              htmlFor="verified"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show verified professionals only
            </label>
          </div>
        </div>
        
        {/* Mobile filters */}
        {showMobileFilters && (
          <div className="lg:hidden pt-6 border-t border-border mt-6 space-y-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">Categories</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryToggle(category)}
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2 block">Price Range ($/hr)</Label>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="verified-mobile" 
                checked={verifiedOnly}
                onCheckedChange={(checked) => {
                  setVerifiedOnly(checked === true);
                }}
              />
              <label
                htmlFor="verified-mobile"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show verified professionals only
              </label>
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button onClick={handleSearch} className="flex-1">Apply Filters</Button>
              <Button variant="outline" onClick={clearFilters}>Clear</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
