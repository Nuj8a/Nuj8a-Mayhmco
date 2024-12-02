import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Progress } from '@/components/ui/progress';

const formSchema = z.object({
  domainName: z
    .string()
    .min(2, {
      message: 'Domain name must be at least 2 characters.'
    })
    .max(100, {
      message: 'Domain name cannot be greater than 100 characters.'
    }),
  fileName: z
    .string()
    .min(2, {
      message: 'File name must be at least 2 characters.'
    })
    .max(100, {
      message: 'File name cannot be greater than 100 characters.'
    })
});

export function AddDomain() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domainName: '',
      fileName: ''
    }
  });

  const onSubmit = (data: any) => {
    // console.log(data);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      // console.log('Modal closed');
      form.reset();
    }
  };

  return (
    <Dialog onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button variant="default">
          Add Domain <Plus className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Add domain</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div>
              <p className="opacity-80">You are adding this domain in</p>
              <p className="text-sm font-medium">123.12.21.23 IP address</p>
            </div>

            <FormField
              control={form.control}
              name="domainName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter domain name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Progress value={22} />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant={'destructive'} type="reset">
                  Close <X className="ml-2 mt-[1px] h-4 w-4" />
                </Button>
              </DialogClose>
              <Button
                // isLoading={true}
                // loadingText="Adding..."
                variant="default"
                type="submit"
              >
                Add Domain <Plus className="ml-2 mt-[1px] h-4 w-4" />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
