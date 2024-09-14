import Link from "next/link";
// import { User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedMark } from "@/components/verified-mark";

interface ResultCardProps {
  data: {
    id: string;
    title: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    createdAt: Date;
    updatedAt: Date;
    videoUrl: string;
    videoStatus: "LIVE" | "ENDED";
    videoId: string;
    user: any;
  };
}

export const ResultCard = ({ data }: ResultCardProps) => {
  const isLive = data.videoStatus == "LIVE";
  const videoLink = isLive
    ? `/u/${data?.user?.userName}`
    : `/video/${data.videoId}`;

  return (
    // wrapped in a link to make the whole card clickable
    // extracting data from the props and passing it to the thumbnail component
    <Link href={videoLink}>
      <div className="w-full flex gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            thumbnailUrl={data.thumbnailUrl}
            src={data.videoUrl}
            fallback={data.user.userImage}
            isLive={isLive}
            username={data.user.userName}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold text-lg cursor-pointer hover:text-orange-600">
              {data.user.userName}
            </p>
            <VerifiedMark />
          </div>
          <p className="text-sm text-muted-foreground">{data.title}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(data.updatedAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
};
