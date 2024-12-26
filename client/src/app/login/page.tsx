'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Gavel, Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {
    mutate: signIn,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log('submit');
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8 p-8">
        <div className="flex flex-col items-center">
          <Gavel className="h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold text-primary">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your auctioneer dashboard
          </p>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            signIn({ email: formData.email, password: formData.password });
          }}
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  signIn({ email: formData.email, password: formData.password })
                }
                className="mt-1"
              />
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
            <Loader2
              className="animate-spin"
              style={{ display: isPending ? 'inline-block' : 'none' }}
            />
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  );
}
