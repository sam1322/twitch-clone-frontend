"use client";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import LiveBadge from "@/components/live-badge";
import { UserAvatar } from "@/components/user-avatar";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface ThumbnailProps {
  src: string;
  thumbnailUrl: string | null;
  fallback: string;
  isLive: boolean;
  username: string;
}

export const Thumbnail = ({
  src,
  thumbnailUrl,
  fallback,
  isLive,
  username,
}: ThumbnailProps) => {
  let content;

  // If there is no thumbnail, we'll show the user's avatar instead.
  if (!thumbnailUrl) {
    const hlsUrl = "http://localhost:8000/live/" + src + "/index.m3u8";
    content = (
      <div className="bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md">
        {/* <UserAvatar
          size="lg"
          showBadge
          userName={username}
          imageUrl={fallback}
          isLive={isLive}
        /> */}
        <ReactPlayer
          style={{ borderRadius: "10px" }}
          borderRadius="10px"

          url={hlsUrl}
          noplay
          // playing
          // controls
          // pip
          width="100%"
          // height="700px"
        />
      </div>
    );
    // If there is a thumbnail, we'll show it.
  } else {
    content = (
      <Image
        src={thumbnailUrl}
        fill
        alt="Thumbnail"
        className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
      />
    );
  }

  // If the stream is live, we'll show the live badge.
  return (
    <div className="group aspect-video relative rounded-md cursor-pointer">
      <div className="rounded-md absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
      {content}
      {isLive && src && (
        <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

// This is the skeleton that will be shown while the thumbnail is loading.
export const ThumbnailSkeleton = () => {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
