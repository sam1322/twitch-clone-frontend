// "use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowRightFromLine, Settings } from "lucide-react";
import { FC } from "react";
import { UserAvatar } from "../user-avatar";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth-service";
import Image from "next/image";

interface LogoutTooltipProps {
  user: any;
}

const LogoutTooltip: FC<LogoutTooltipProps> = ({ user }) => {
  console.log("logout", user);

  return (
    <div>
      {/* <UserAvatar
        imageUrl={user.imageUrl}
        userName={user.userName}
        // isLive={isLive}
        // showBadge={true}
        size={"default"}
      /> */}

      <Popover>
        <PopoverTrigger asChild>
          <UserAvatar
            className="cursor-pointer"
            imageUrl={user.imageUrl}
            // imageUrl="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg"
            userName={user.userName}
            // isLive={isLive}
            // showBadge={true}
            size={"default"}
          />
          {/* <Button variant="outline">Open popover</Button> */}
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <UserAvatar
                // className="cursor-pointer"
                imageUrl={user.imageUrl}
                userName={user.userName}
                // isLive={isLive}
                // showBadge={true}
                size={"md"}
              />

              {/* <Image
                src={user.imageUrl}
                alt="Google Profile Image"
                referrerPolicy="no-referrer"
                width={100}
                height={100}
              /> */}
              <div className="grid gap-1">
                <h4 className="text-sm font-medium leading-none">
                  {user.userName}
                </h4>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "justify-start pl-0 h-12 cursor-pointer"
              )}
            >
              <div className="h-12 w-12 flex items-center justify-center">
                <Settings className="w-4 text-muted-foreground" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm text-muted-foreground">Manage Account</p>
              </div>
            </div>

            {/* <div
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "justify-start pl-0 h-12 cursor-pointer"
              )}
              // onClick={onClick}
            >
              <div className="h-12 w-12 flex items-center justify-center">
                <ArrowRightFromLine className="w-4 text-muted-foreground" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm text-muted-foreground">Sign out</p>
              </div>
            </div> */}
            <form action={signOut} className="w-full">
      
              <Button
                type="submit"
                variant="ghost"
                className="justify-start pl-0 h-12 cursor-pointer w-full outline-none focus-visible:ring-0"
              >
                <div className="h-12 w-12 flex items-center justify-center">
                  <ArrowRightFromLine className="w-4 text-muted-foreground" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm text-muted-foreground">Sign out</p>
                </div>
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LogoutTooltip;
