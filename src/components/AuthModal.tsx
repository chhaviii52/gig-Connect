
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock, User, ArrowRight, Check } from 'lucide-react';

interface AuthModalProps {
  initialView?: 'login' | 'signup';
}

const AuthModal = ({ initialView = 'login' }: AuthModalProps) => {
  const [view, setView] = useState<'login' | 'signup'>(initialView);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (view === 'login') {
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
      } else {
        toast({
          title: "Account created!",
          description: "Your account has been successfully created.",
        });
      }
    }, 1500);
  };

  return (
    <div className="w-full space-y-6 p-1">
      <div className="flex flex-col space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          {view === 'login' ? 'Welcome back' : 'Create an account'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {view === 'login' 
            ? 'Enter your credentials to access your account' 
            : 'Enter your information to create your account'}
        </p>
      </div>

      <Tabs defaultValue={view} onValueChange={(v) => setView(v as 'login' | 'signup')} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login" className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" size="sm" className="text-xs px-0 h-auto">
                  Forgot password?
                </Button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full shadow-button" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  Signing in
                  <span className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-opacity-50 border-t-transparent"></span>
                </span>
              ) : (
                <span className="flex items-center">
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="signup" className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  required
                  className="pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signupEmail">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="signupEmail" 
                  type="email" 
                  placeholder="name@example.com" 
                  required
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signupPassword">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="signupPassword" 
                  type="password" 
                  placeholder="••••••••" 
                  required
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 text-sm">
                <Check className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Password must be at least 8 characters</span>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full shadow-button" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  Creating account
                  <span className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-opacity-50 border-t-transparent"></span>
                </span>
              ) : (
                <span className="flex items-center">
                  Create account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground pt-2">
              By creating an account, you agree to our{" "}
              <a href="#" className="underline underline-offset-2 hover:text-primary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-2 hover:text-primary">
                Privacy Policy
              </a>
            </p>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthModal;
