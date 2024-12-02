import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Plus, Trash2Icon } from 'lucide-react';

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmation({
  isOpen,
  onClose,
  onConfirm
}: DeleteConfirmationProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-end gap-2 font-bold text-destructive">
            {' '}
            <AlertTriangle /> Confirm Delete
          </DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete this content? This action can&apos;t
          be undone.
        </p>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="secondary"
              onClick={onClose}
              className="flex gap-1"
            >
              Cancel <Plus className="rotate-45 scale-110" size={17} />
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="flex items-center gap-1"
            onClick={onConfirm}
          >
            Confirm Delete <Trash2Icon size={15} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
