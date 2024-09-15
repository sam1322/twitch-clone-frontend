"use server";
import { UserAvatar } from "@/components/user-avatar";
import { getSelf } from "@/lib/auth-service";
import { ChevronRight } from "lucide-react";
import BasicInfo from "./_components/BasicInfo";
import { redirect } from "next/navigation";

interface SettingsPageProps {}

const SettingsPage = async ({}: SettingsPageProps) => {
  const user = await getSelf();
  if(!user){
    redirect("/");
  }
  console.log("user", user);

  const rowClass =
    "grid grid-cols-[150px_minmax(300px,_1fr)_100px] gap-4 items-center border-b p-4 hover:bg-[#252731] cursor-pointer";

  const UserNameComponent = () => {
    // "use server";
    // return <div> User</div>;
    return (
      <div className={rowClass}>
        <div className="text-sm">Name</div>
        <div className="text-sm">{user.userName}</div>
        <div className="flex justify-end">
          <ChevronRight className="w-6 h-6 text-foreground" />
        </div>
      </div>
    );
  };

  return (
    <>
      <BasicInfo user={user} />
    </>
  );

  return (
    <div className="h-full p-8 flex flex-col items-center gap-2">
      <h1 className="text-2xl bold text-foreground">Settings</h1>
      <h3 className="text-md text-muted-foreground">
        Info about you and your preferences
      </h3>
      <div className="p-8 mt-2 flex flex-col rounded-xl border border-muted-foreground ">
        <div className="text-xl p-4">Basic Info</div>
        <div className={rowClass}>
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

        <div className={rowClass}>
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
        <div className={rowClass}>
          <div className="text-sm">Bio</div>
          <div className="text-sm">{user.bio}</div>
          <div className="flex justify-end">
            <ChevronRight className="w-6 h-6 text-foreground" />
          </div>
        </div>
      </div>

      <ModalBox
        Trigger={<UserNameComponent />}
        Content={<UserNameComponent />}
      />
    </div>
  );
};

export default SettingsPage;
