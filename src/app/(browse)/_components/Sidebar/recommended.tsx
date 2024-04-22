"use client";
import { useSidebar } from "@/store/use-sidebar";
import { FC } from "react";
import { UserItem, UserItemSkeleton } from "./user-item";

interface RecommendedProps {
  data: any[];
}

export const Recommended: FC<RecommendedProps> = ({ data }) => {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.userId}
            userName={user.userName ?? "User"}
            // imageUrl={user.imageUrl}
            imageUrl={user.userImage}
            isLive={user?.currentStream?.live}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, index) => (
        <UserItemSkeleton key={index} />
      ))}
    </ul>
  );
};
