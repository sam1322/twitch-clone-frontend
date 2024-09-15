"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadUserImage } from "@/lib/upload-service";
import { updateUser, uploadUserPic } from "@/lib/user-service";
import { Trash2, Upload, X } from "lucide-react";
import { FC, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { FileProps } from "./EditProfilePic";

interface ChangeImageProfileProps {
  imageFile: FileProps | null;
  imageLink: string | null;
  setImageFile: (imageFile: any) => void;
  setImageLink: (imageLink: string) => void;
  removeImagePreview: () => void;
  removeImageLink: () => void;
  setOpen: (open: boolean) => void;
}

const ChangeImageProfile: FC<ChangeImageProfileProps> = ({
  imageFile,
  imageLink,
  setImageFile,
  setImageLink,
  removeImagePreview,
  removeImageLink,
  setOpen,
}) => {
  type ImageStateProp = "Change" | "ImageLink" | "UploadImage";
  const fileInputRef = useRef(null);
  const [imageState, setImageState] = useState<ImageStateProp>("Change");
  const [isPending, startTransition] = useTransition();

  const removeImagePreviewFn = () => {
    removeImagePreview();
    // @ts-ignore
    fileInputRef.current.value = null;
  };

  const onSubmitLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const result = await updateUser({ userImage: imageLink });
        toast.success("User Image updated successfully");
        setOpen(false);
      } catch (error) {
        if (error instanceof Error) {
          console.error("error updating image link", error.message);
          toast.error(error.message);
        }
      }
      // closeRef.current?.click();
      // Content?.SaveAction?.();
    });
    // setImageFile(null);
    // setImageState("Change");
  };

  const onUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        console.log("imageFile", imageFile);

        const formData = new FormData();
        formData.append("file", imageFile?.file);

        // const result = await uploadUserImage({ formData:formData });
        const result = await uploadUserImage(imageFile?.file);
        console.log("result", result);
        toast.success("User Image updated successfully");
        setOpen(false);
      } catch (error) {
        if (error instanceof Error) {
          console.error("error updating image link", error.message);
          toast.error(error.message);
        }
      }
      // closeRef.current?.click();
      // Content?.SaveAction?.();
    });
    // setImageFile(null);
    // setImageState("Change");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xl text-center">Change Profile Picture</div>
      {imageState == "Change" && (
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            onClick={() => setImageState("UploadImage")}
          >
            Upload Image
          </Button>
          <Button
            // variant="primary"
            onClick={() => setImageState("ImageLink")}
          >
            Image Link
          </Button>
        </div>
      )}

      {imageState == "UploadImage" && (
        <form onSubmit={onUpload} className="flex items-center gap-2">
          <Button
            variant="ghost"
            disabled={isPending}
            className="relative w-full border cursor-pointer"
          >
            {imageFile ? imageFile.file.name : "Input file"}
            <input
              disabled={isPending}
              type="file"
              ref={fileInputRef}
              className="absolute right-0 left-0 opacity-0 w-full h-full cursor-pointer"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setImageFile((prev) => ({
                  ...prev,
                  file,
                }));
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setImageFile((prev) => ({
                      //   file,
                      ...prev,
                      preview: reader.result as string,
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </Button>

          {imageFile?.preview && (
            <Button
              variant={"destructive"}
              onClick={removeImagePreviewFn}
              title="Remove Image"
              disabled={isPending}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
          <Button title="Upload Image" type="submit" disabled={isPending}>
            <Upload className="w-4 h-4" />
          </Button>
        </form>
      )}
      {imageState == "ImageLink" && (
        <form onSubmit={onSubmitLink} className="flex items-center gap-2">
          <Input
            disabled={isPending}
            type="text"
            placeholder="Enter Image URL"
            value={imageLink || ""}
            onChange={(e) => setImageLink(e.target.value)}
          />
          {imageLink != null && imageLink != "" && (
            <Button
              variant={"destructive"}
              onClick={removeImageLink}
              title="Remove Image"
              disabled={isPending}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
          <Button title="Upload Image" type="submit" disabled={isPending}>
            <Upload className="w-4 h-4" />
          </Button>
        </form>
      )}
    </div>
  );
};

export default ChangeImageProfile;
