"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { ArrowLeft, Cross, Pencil, Trash, X } from "lucide-react";
import Image from "next/image";
import {
  ElementRef,
  FC,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import ChangeImageProfile from "./ChangeImageProfile";

interface EditProfilePicContentProps {
  initialValue: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  userName: string;
}
export type FileProps = {
  file: File;
  preview: string;
};

export const EditProfilePicContent: FC<EditProfilePicContentProps> = ({
  open,
  setOpen,
  initialValue,
  userName,
}) => {
  type ProfileProp = "Profile";
  type ChangeProp = "Change";
  type RemoveProp = "Remove";
  type ModalStateProp = ProfileProp | ChangeProp | RemoveProp;

  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(initialValue || "");
  const [imageFile, setImageFile] = useState<FileProps | null>(null);
  const [imageLink, setImageLink] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalStateProp>("Profile");
  // event is type react form element

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      setOpen(false);
      // closeRef.current?.click();
      // Content?.SaveAction?.();
    });
  };

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setModalState("Profile");
        setImageFile(null);
        setImageLink(null);
        setValue("");
      }, 200);
    } else {
      setValue(initialValue || "");
    }
  }, [open]);

  const imageUrl =
    modalState == "Profile"
      ? value
      : modalState == "Change"
      ? imageFile?.preview
        ? imageFile?.preview
        : imageLink
      : "";

  const removeImagePreview = () => {
    setImageFile(null);
    // setValue("");
  };
  const removeImageLink = () => {
    setImageLink(null);
    // setValue("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {modalState != "Profile" ? (
          <ArrowLeft
            className="w-8 h-8 cursor-pointer hover:bg-[#c7c7c73d] active:bg-[#c7c7c71f] rounded-full p-1 ease-in-out transition-all duration-200"
            onClick={() => setModalState("Profile")}
          />
        ) : (
          <DialogHeader>
            <DialogTitle>Profile Picture</DialogTitle>
          </DialogHeader>
        )}
        <div className="space-y-4">
          <div className="w-full flex items-center justify-center">
            <UserAvatar
              size="4xl"
              userName={userName}
              imageUrl={imageUrl}
              className="text-6xl"
            />
          </div>
          {modalState == "Remove" && (
            <div className="p-4 gap-2 flex flex-col">
              <div className="text-xl text-center">Remove Profile Picture</div>
              <div className="text-md text-center">
                Are you sure you want to proceed ?
              </div>
            </div>
          )}
          {modalState == "Change" && (
            <ChangeImageProfile
              imageFile={imageFile}
              setImageFile={setImageFile}
              imageLink={imageLink}
              setImageLink={setImageLink}
              removeImagePreview={removeImagePreview}
              removeImageLink={removeImageLink}
              setOpen={setOpen}
            />
            // <div className="flex flex-col items-center gap-4">
            //   <div className="text-xl text-center">Remove Profile Picture</div>
            //   <div className="flex items-center gap-2">
            //     <Button
            //       // className={cn(
            //       //   buttonVariants({ variant: "ghost" }),
            //       //   "relative w-full border cursor-pointer"
            //       // )}
            //       variant="ghost"
            //       className="relative w-full border cursor-pointer"
            //       disabled={imageLink != null && imageLink != ""}
            //     >
            //       {imageFile ? imageFile.file.name : "Input file"}
            //       <input
            //         type="file"
            //         className="absolute right-0 left-0 opacity-0 w-full h-full cursor-pointer"
            //         accept="image/*"
            //         onChange={(e) => {
            //           const file = e.target.files?.[0];
            //           if (file) {
            //             const reader = new FileReader();
            //             reader.onload = () => {
            //               setImageFile({
            //                 file,
            //                 preview: reader.result as string,
            //               });
            //             };
            //             reader.readAsDataURL(file);
            //           }
            //         }}
            //       />
            //     </Button>

            //     {imageFile?.preview && (
            //       <Button
            //         variant={"ghost"}
            //         className="rounded-full w-8 h-8 p-2"
            //         onClick={removeImagePreview}
            //       >
            //         <X className="w-4 h-4" />
            //       </Button>
            //     )}
            //   </div>
            //   {/* or
            //   <div className="flex items-center gap-2">
            //     <Input
            //       disabled={imageFile != null}
            //       type="text"
            //       placeholder="Enter Image URL"
            //       value={imageLink || ""}
            //       onChange={(e) => setImageLink(e.target.value)}
            //     />

            //     <Button
            //       variant={"ghost"}
            //       className="rounded-full w-8 h-8 p-2"
            //       onClick={removeImageLink}
            //     >
            //       <X className="w-4 h-4" />
            //     </Button>
            //   </div> */}
            //   <Button
            //   // variant={"ghost"}
            //   // className="rounded-full w-8 h-8 p-2"
            //   // onClick={removeImageLink}
            //   >
            //     Upload
            //   </Button>
            // </div>
          )}
          {modalState == "Profile" && (
            <div className="flex justify-between">
              <Button
                type="button"
                variant="primary"
                onClick={() => setModalState("Change")}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Change
              </Button>

              <Button
                type="submit"
                variant="destructive"
                onClick={() => setModalState("Remove")}
              >
                <Trash className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// const EditUserTitle = "Edit User Name";

// export const EditUser: ModalBoxContentProps = {
//   Content: EditProfilePicContent,
//   Title: EditUserTitle,
//   //   SaveAction: SaveAction,
// };
