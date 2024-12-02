'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ArrowRight, Eye, EyeOff, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ServerUrl from '@/service/ServerUrl';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(2, { message: 'Password must be at least 2 characters.' })
});

export default function UserAuthForm() {
  const defaultValues = {
    email: '',
    password: ''
  };
  const [eyeOpen, setEyeOpen] = useState<boolean>(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });
  const [isLoading, setIsLoading] = useState(false);

  interface UserFormValue {
    email: string;
    password: string;
  }
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.token) {
      router.push('/dashboard');
    }
  }, [session, router]);

  const onSubmit = async (data: UserFormValue) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${ServerUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const resData = await response.json();

      if (resData?.success) {
        toast.success('You have successfully logged in.');

        const signInResult = await signIn('credentials', {
          token: resData.token || ''
        });

        if (signInResult?.error) {
          toast.error(signInResult.error || 'An error occurred');
        } else {
          router.push('/dashboard');
        }
      } else {
        toast.error(resData.message || 'Invalid credentials');
      }
    } catch (error) {
      toast.error('An error occurred while logging in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your email..."
                    disabled={isLoading}
                    {...field}
                    endContent={<UserRound size={17} />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={!eyeOpen ? 'password' : 'text'}
                    placeholder="Enter your password..."
                    disabled={isLoading}
                    {...field}
                    endContent={
                      eyeOpen ? (
                        <Eye
                          className="cursor-pointer"
                          onClick={() => setEyeOpen(false)}
                          size={17}
                        />
                      ) : (
                        <EyeOff
                          className="cursor-pointer"
                          onClick={() => setEyeOpen(true)}
                          size={17}
                        />
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isLoading}
            className="!mt-4 ml-auto w-full"
            type="submit"
            isLoading={isLoading}
            loadingText="Logging in, please wait..."
          >
            Sign In <ArrowRight size={18} className="pl-1 pt-[1px]" />
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </>
  );
}
