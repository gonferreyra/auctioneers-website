'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Gavel, Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/lib/api';
import { loginSchema } from '@/validations/schemas';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const {
    mutate: signIn,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors({
        email: fieldErrors.email?._errors[0] || '',
        password: fieldErrors.password?._errors[0] || '',
      });
      return;
    }
    setErrors({ email: '', password: '' });
    signIn(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error for the field being updated
    setErrors({ ...errors, [name]: '' });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8 p-8">
        <div className="flex flex-col items-center">
          <Gavel className="h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold text-primary">
            Ingresa a tu cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accede al menu de martilleros
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </div>
          {/* Handle errors */}

          {isError && (
            <div className="rounded border border-red-500 p-2 text-center text-red-500 transition">
              <p>{error.message}</p>
              {/* <p>Test error</p> */}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Ingresar'
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
