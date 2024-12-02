'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Eye, EyeOff, Folder, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
// import handleAPIService from '@/service/handleAPIService';
// import { useSession } from 'next-auth/react';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' })
    .max(25, { message: 'Username must be less than 25 characters.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' })
    .max(25, { message: 'Password must be less than 25 characters.' }),
  directory: z.string().nonempty({ message: 'Directory is required.' })
});

const AccountCreateCard = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      directory: '/public_html',
      name: '',
      password: ''
    }
  });

  const onSubmit = async (data: {
    name: String;
    password: String;
    directory: String;
  }) => {};

  const [passwordSee, setPasswordSee] = useState<boolean>(false);

  return (
    <div className="rounded-[var(--radius)] border bg-card p-8">
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold">Create a New FTP Account</div>
        <Separator />
        <div className="text-sm opacity-75">
          Add and configure FTP Accounts to get your website on the internet
          fast. You can use an FTP client to manage your website’s files. For
          more information, please open this article.
        </div>

        <div className="mt-1 text-sm font-semibold">Directory</div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Directory Input */}
            <div className="flex w-full">
              <div className="flex h-10 items-center justify-center rounded-md rounded-r-none border border-r border-input bg-black/5 px-8 py-1 text-[0.9rem] shadow-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                /home/U0291/root/
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="directory"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter directory"
                          className="flex !h-10 w-full rounded-l-none border border-l-0 shadow-none"
                          {...field}
                          endContent={<Folder size={16} />}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Username"
                          className="!h-10"
                          {...field}
                          endContent={<User size={17} />}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type={!passwordSee ? `password` : `text`}
                          className="!h-10"
                          {...field}
                          endContent={
                            passwordSee ? (
                              <Eye
                                onClick={() => setPasswordSee((p) => !p)}
                                size={17}
                                className="cursor-pointer"
                              />
                            ) : (
                              <EyeOff
                                onClick={() => setPasswordSee((p) => !p)}
                                size={17}
                                className="cursor-pointer"
                              />
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Progress value={22} />

            <div>
              <Button
                // isLoading={true}
                // disabled={true}
                type="submit"
                variant="default"
                loadingText="Creating..."
                size="lg"
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AccountCreateCard;
