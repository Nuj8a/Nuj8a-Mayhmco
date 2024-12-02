import { Button } from '@/components/ui/button';
import {
  Settings,
  Package,
  CreditCard,
  User,
  ShoppingCart,
  FolderPlus,
  Star,
  ImageIcon
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SettingPopover() {
  const router = usePathname();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={`rounded-full ${
            router.includes('/dashboard/settings')
              ? 'bg-muted'
              : 'bg-transparent'
          }`}
          size="icon"
        >
          <Settings size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="float-left -mr-10 mt-[2.3rem] w-72 rounded-lg border !p-1 text-sm shadow-md"
        side="left"
        align="start"
      >
        <Command className="h-full">
          <CommandInput className="!text-sm" placeholder="Search settings..." />
          <CommandList>
            <ScrollArea className="h-[300px] pr-1">
              <CommandEmpty>No settings found.</CommandEmpty>
              <CommandGroup className="pb-1" heading="Content Management">
                <CommandItem
                  className={`flex h-full w-full cursor-pointer items-center gap-2 ${
                    router === '/dashboard/settings/category' ? 'bg-border' : ''
                  }`}
                >
                  <Link
                    href={'/dashboard/settings/category'}
                    className="flex h-full w-full items-center gap-2"
                  >
                    <FolderPlus size={16} />
                    <span>Add New Category</span>
                  </Link>
                </CommandItem>
                <CommandItem
                  className={`flex h-full w-full cursor-pointer items-center gap-2 ${
                    router === '/dashboard/settings/banner' ? 'bg-border' : ''
                  }`}
                >
                  <Link
                    href={'/dashboard/settings/banner'}
                    className="flex h-full w-full items-center gap-2"
                  >
                    <ImageIcon size={16} />
                    <span>Create Banner</span>
                  </Link>
                </CommandItem>
                <CommandItem
                  className={`flex h-full w-full cursor-pointer items-center gap-2 ${
                    router === '/dashboard/settings/highlight-spotlight'
                      ? 'bg-border'
                      : ''
                  }`}
                >
                  <Link
                    href={'/dashboard/settings/highlight-spotlight'}
                    className="flex h-full w-full items-center gap-2"
                  >
                    <Star size={16} />
                    <span>Highlight Spotlight</span>
                  </Link>
                </CommandItem>
                <CommandItem
                  className={`flex h-full w-full cursor-pointer items-center gap-2 ${
                    router === '/dashboard/settings/manage-product-listings'
                      ? 'bg-border'
                      : ''
                  }`}
                >
                  <Link
                    href={'/dashboard/settings/manage-product-listings'}
                    className="flex h-full w-full items-center gap-2"
                  >
                    <Package size={16} />
                    <span>Manage Product Listings</span>
                  </Link>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Orders">
                <CommandItem
                  className={`flex h-full w-full cursor-pointer items-center gap-2 ${
                    router === '/dashboard/settings/all-orders'
                      ? 'bg-border'
                      : ''
                  }`}
                >
                  <Link
                    href={'/dashboard/settings/all-orders'}
                    className="flex h-full w-full items-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    <span>View All Orders</span>
                  </Link>
                  <CommandShortcut>⌘O</CommandShortcut>
                </CommandItem>
                <CommandItem
                  className={`flex h-full w-full cursor-pointer items-center gap-2 ${
                    router === '/dashboard/settings/payments-transactions'
                      ? 'bg-border'
                      : ''
                  }`}
                >
                  <Link
                    href={'/dashboard/settings/payments-transactions'}
                    className="flex h-full w-full items-center gap-2"
                  >
                    <CreditCard size={16} />
                    <span>Payments & Transactions</span>
                  </Link>
                  <CommandShortcut>⌘T</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Account">
                <CommandItem
                  className={`flex h-full w-full cursor-pointer items-center gap-2 ${
                    router === '/dashboard/settings/edit-profile'
                      ? 'bg-border'
                      : ''
                  }`}
                >
                  <Link
                    href={'/dashboard/settings/edit-profile'}
                    className="flex h-full w-full items-center gap-2"
                  >
                    <User size={16} />
                    <span>Edit Profile</span>
                  </Link>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem
                  className={`flex h-full w-full cursor-pointer items-center gap-2 ${
                    router === '/dashboard/settings/user-roles'
                      ? 'bg-border'
                      : ''
                  }`}
                >
                  <Link
                    href={'/dashboard/settings/user-roles'}
                    className="flex h-full w-full items-center gap-2"
                  >
                    <Settings size={16} />
                    <span>Manage User Roles</span>
                  </Link>
                  <CommandShortcut>⌘R</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
