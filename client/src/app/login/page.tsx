'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Gavel, Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/lib/api';
import { loginSchema, TLoginSchema } from '@/validations/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.replace('/dashboard');
    },
    // server errrors
    onError: (error) => {
      const errorMessage =
        'Hubo un error con el inicio de sesion. Contactar administrador.';
      if (error.message === undefined) {
        toast.error(error.message);
        return;
      }
      toast.error(errorMessage);
    },
  });

  const onSubmit = async (data: TLoginSchema) => {
    signIn(data);
  };

  // client side validation errors - client errors
  const onError = () => {
    (Object.keys(errors) as Array<keyof TLoginSchema>).forEach((key) => {
      const error = errors[key];
      if (error) {
        toast.error(error.message || 'Hubo un error');
      }
    });
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

        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(onSubmit, onError)}
          noValidate
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                {...register('email')}
                id="email"
                name="email"
                type="email"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                required
                className="mt-1"
              />
            </div>
          </div>

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
