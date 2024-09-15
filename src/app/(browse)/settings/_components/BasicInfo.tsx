"use client";
import { UserAvatar } from "@/components/user-avatar";
import { ChevronRight } from "lucide-react";
import { FC, useState } from "react";
import { EditBioContent } from "./EditBio";
import { EditProfilePicContent } from "./EditProfilePic";
import { EditUserContent } from "./EditUser";

interface BasicInfoProps {
  user: any;
}

const BasicInfo: FC<BasicInfoProps> = ({ user }) => {
  const rowClass =
    "grid grid-cols-[150px_minmax(300px,_1fr)_100px] gap-4 items-center border-b p-4 hover:bg-[#252731] cursor-pointer";

  type NameProp = "Name";
  type BioProp = "Bio";
  type ProfilePictureProp = "Profile picture";

  const Name: NameProp = "Name";
  const Bio: BioProp = "Bio";
  const ProfilePicture: ProfilePictureProp = "Profile picture";

  type OpenModalProps = NameProp | BioProp | ProfilePictureProp | null;

  const [openModal, setOpenModal] = useState<OpenModalProps>(null);
  const toggleOpen = (openValue: OpenModalProps) => {
    if (openModal) {
      setOpenModal(null);
    } else {
      setOpenModal(openValue);
    }
  };

  return (
    <div className="h-full p-8 flex flex-col items-center gap-2">
      <h1 className="text-2xl bold text-foreground">Settings</h1>
      <h3 className="text-md text-muted-foreground">
        Info about you and your preferences
      </h3>
      <div className="p-8 mt-2 flex flex-col rounded-xl border border-muted-foreground ">
        <div className="text-xl p-4">Basic Info</div>
        <div className={rowClass} onClick={() => toggleOpen(ProfilePicture)}>
          <div className="text-sm">Profile picture</div>
          <div className="text-sm">
            A picture helps people to recognise you
            {/* and lets you know when
        you’re signed in to your account */}
          </div>
          <div className="flex justify-end">
            <UserAvatar
              size="md"
              showBadge
              userName={user.userName}
              imageUrl={user.userImage}
              //   isLive={isLive}
            />
          </div>
        </div>

        <div className={rowClass} onClick={() => toggleOpen(Name)}>
          <div className="text-sm">Name</div>
          <div className="text-sm">{user.userName}</div>
          <div className="flex justify-end">
            <ChevronRight className="w-6 h-6 text-foreground" />
          </div>
        </div>

        <div className={rowClass}>
          <div className="text-sm">Email</div>
          <div className="text-sm">{user.email}</div>
          <div className="flex justify-end col-span-1">
            <ChevronRight className="w-6 h-6 text-foreground" />
          </div>
        </div>
        <div className={rowClass} onClick={() => toggleOpen(Bio)}>
          <div className="text-sm">Bio</div>
          <div className="text-sm">{user.bio}</div>
          <div className="flex justify-end">
            <ChevronRight className="w-6 h-6 text-foreground" />
          </div>
        </div>
      </div>
      <EditUserContent
        initialValue={user?.userName}
        open={openModal == Name}
        setOpen={() => toggleOpen(null)}
      />

      <EditBioContent
        initialValue={user?.bio}
        open={openModal == Bio}
        setOpen={() => toggleOpen(null)}
      />
      <EditProfilePicContent
        userName={user?.userName}
        initialValue={user?.userImage}
        open={openModal == ProfilePicture}
        setOpen={() => {
          toggleOpen(null);
        }}
      />
    </div>
  );
};

export default BasicInfo;
