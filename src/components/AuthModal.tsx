import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

// 🔹 Define props
type AuthModalProps = {
  initialView?: 'login' | 'signup';
  onAuthSuccess: (user: { id: string; email: string; name?: string }) => void;
};

const AuthModal: React.FC<AuthModalProps> = ({ initialView = 'login', onAuthSuccess }) => {
  const [view, setView] = useState<'login' | 'signup'>(initialView);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();

  const onSubmit = async (data: Record<string, any>) => {
    setLoading(true);
    console.log("🔹 Submitting login/signup form...");

    const endpoint = view === 'login' 
      ? 'http://localhost:5000/api/context/login' 
      : 'http://localhost:5000/api/context/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Something went wrong');

      console.log("✅ Signup/Login success!", result);
      toast({ title: 'Success', description: `You have successfully ${view}ed!` });

      // ✅ If user signed up, automatically log them in
      if (view === 'signup') {
        console.log("🔄 Automatically logging in after signup...");
        const loginRes = await fetch("http://localhost:5000/api/context/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email, password: data.password }),
          credentials: "include",
        });

        const loginData = await loginRes.json();
        if (!loginRes.ok) throw new Error(loginData.message || "Login failed after signup");

        console.log("🚀 Auto-login success!", loginData);
      }

      // ✅ Fetch user details after login/signup
      const userRes = await fetch("http://localhost:5000/api/context/user", { credentials: "include" });
      const userData = await userRes.json();

      if (userRes.ok) {
        console.log("🚀 User data received:", userData);
        onAuthSuccess(userData);  // ✅ Update state
        // 🔄 **Force page refresh to reflect changes immediately**
        window.location.reload();  
      } else {
        console.log("⚠️ Error fetching user details:", userData);
      }

      reset();
    } catch (error: any) {
      console.error("❌ Error in AuthModal:", error);
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-center">{view === 'login' ? 'Log in' : 'Sign up'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input {...register('email', { required: true })} type="email" />
        </div>
        <div>
          <Label>Password</Label>
          <Input {...register('password', { required: true })} type="password" />
        </div>
        {view === 'signup' && (
          <div>
            <Label>Name</Label>
            <Input {...register('name', { required: true })} type="text" />
          </div>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Processing...' : view === 'login' ? 'Log in' : 'Sign up'}
        </Button>
      </form>
      <p className="text-center text-sm">
        {view === 'login' ? "Don't have an account? " : 'Already have an account? '}
        <button
          type="button"
          className="text-primary underline"
          onClick={() => setView(view === 'login' ? 'signup' : 'login')}
        >
          {view === 'login' ? 'Sign up' : 'Log in'}
        </button>
      </p>
    </div>
  );
};

export default AuthModal;
