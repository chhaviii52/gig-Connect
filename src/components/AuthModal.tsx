import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AuthModal = ({ initialView = 'login' }) => {
  const [view, setView] = useState(initialView);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();

  const onSubmit = async (data) => {
    setLoading(true);
    const endpoint = view === 'login' ? 'http://localhost:5000/api/context/login' : 'http://localhost:5000/api/context/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Something went wrong');
      
      toast({ title: 'Success', description: `You have successfully ${view}ed!` });
      reset();
    } catch (error) {
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
          <Input {...register('email')} type="email" required />
        </div>
        <div>
          <Label>Password</Label>
          <Input {...register('password')} type="password" required />
        </div>
        {view === 'signup' && (
          <div>
            <Label>Name</Label>
            <Input {...register('name')} type="text" required />
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
