"use client";
import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import dynamic from "next/dynamic";
import { FC } from "react";
import { ChatToggle } from "../chat/chat-toggle";
import { Video, VideoSkeleton } from "./video";
import { Chat, ChatSkeleton } from "../chat/chat";
import { Header, HeaderSkeleton } from "./Header";
import { InfoCard } from "./InfoCard";
import { AboutCard } from "./AboutCard";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface StreamPlayerProps {
  isFollowing: boolean;
  stream: any;
  user: any;
  viewer: any;
  videoPage?: boolean;
  video?: any;
}

export const StreamPlayer: FC<StreamPlayerProps> = ({
  isFollowing,
  stream,
  video,
  user,
  viewer,
  videoPage = true,
}) => {
  const { collapsed } = useChatSidebar((state) => state);

  const streamName = video?.title || video?.user?.userName + " is live now";
  const thumbnailUrl = stream?.thumbnailUrl;
  const chatEnabled = stream?.chatEnabled;
  const chatDelayed = stream?.chatDelayed;
  const chatFollowerOnly = stream?.chatFollowerOnly;

  const hostIdentity = user.userId;
  const viewerIdentity = viewer?.userId;

  const hostName = user.userName;

  // console.log("hls url", hlsUrl);

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <div
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1  lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video
            videoPage={videoPage}
            hostName={hostName}
            hostIdentity={user.userId}
            stream={stream}
          />
          <Header
            hostName={hostName}
            hostIdentity={hostIdentity}
            viewerIdentity={viewerIdentity}
            imageUrl={user.userImage}
            isFollowing={isFollowing}
            name={streamName}
            isLive={stream?.live}
          />
          <InfoCard
            hostIdentity={hostIdentity}
            viewerIdentity={viewerIdentity}
            name={streamName}
            thumbnailUrl={thumbnailUrl}
            videoId={video?.videoId}
          />
          <AboutCard
            hostName={hostName}
            hostIdentity={hostIdentity}
            viewerIdentity={viewerIdentity}
            bio={user.bio}
            // followedByCount={user._count.followedBy}
            followedByCount={10}
          />
        </div>
        <div className={cn("col-span-1 2xl:col-span-1", collapsed && "hidden")}>
          <Chat
            video={video}
            videoPage={videoPage}
            viewerName={viewer?.userName}
            hostName={hostName}
            hostIdentity={hostIdentity}
            isFollowing={isFollowing}
            isChatEnabled={chatEnabled}
            isChatDelayed={chatDelayed}
            isChatFollowersOnly={chatFollowerOnly}
          />
        </div>
      </div>
      {/* <div className="h-[1500px]">
        <ReactPlayer
          url={hlsUrl}
          playing
          controls
          pip
          width="100%"
          height="700px"
        />
      </div> */}
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 cols-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg:background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
