import Link from "next/link";
//import { Stream, User } from "@prisma/client";

import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
// import { LiveBadge } from "@/components/live-badge";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";

interface ResultCardProps {
  // data: {
  //   user: User,
  //   isLive: boolean;
  //   name: string;
  //   thumbnailUrl: string | null;
  // };
  data: any;
}

export const ResultCard = ({ data }: ResultCardProps) => {
  const isLive = data.videoStatus == "LIVE";
  const videoLink = isLive
    ? `/u/${data?.user?.userName}`
    : `/video/${data.videoId}`;
  return (
    <Link href={videoLink}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          // src={data.thumbnailUrl}
          thumbnailUrl={data.thumbnailUrl}
          src={data.videoUrl}
          fallback={data.user.userImage}
          isLive={isLive}
          username={data.user.userName}
        />
        <div className="flex gap-x-3">
          <UserAvatar
            userName={data.user.userName}
            imageUrl={data.user.userImage}
            isLive={isLive}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate font-semibold hover:text-blue-500">
              {data?.title || "No title"}
            </p>
            <p className="text-muted-foreground">{data.user.userName}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
};
