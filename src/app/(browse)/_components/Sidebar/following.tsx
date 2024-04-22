"use client";
import { useSidebar } from "@/store/use-sidebar";
import { FC } from "react";
import { UserItem, UserItemSkeleton } from "./user-item";

interface FollowingProps {
  data: any[];
}

export const Following: FC<FollowingProps> = ({ data }) => {
  const { collapsed } = useSidebar((state) => state);

  if (!data.length) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follower) => (
          <UserItem
            key={follower.followerId}
            userName={follower.fullName}
            imageUrl={follower.userImage}
            isLive={follower?.currentStream?.live}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
