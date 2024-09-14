"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateUser } from "@/lib/user-service";
import { isAxiosError } from "axios";
import { ElementRef, FC, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

interface EditUserContentProps {
  initialValue: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const EditUserContent: FC<EditUserContentProps> = ({
  open,
  setOpen,
  initialValue,
}) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(initialValue || "");
  // event is type react form element

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({ userName: value })
        .then(() => {
          toast.success("User name updated successfully");
          closeRef.current?.click();
        })
        .catch((error) => {
          toast.error(error.message);
        });
      // Content?.SaveAction?.();
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user name</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            placeholder="UserName"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isPending}
            className="resize-none"
          />
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// const EditUserTitle = "Edit User Name";

// export const EditUser: ModalBoxContentProps = {
//   Content: EditUserContent,
//   Title: EditUserTitle,
//   //   SaveAction: SaveAction,
// };
