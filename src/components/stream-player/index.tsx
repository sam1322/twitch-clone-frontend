"use client";
import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import dynamic from "next/dynamic";
import { FC } from "react";
import { ChatToggle } from "../chat/chat-toggle";
import { Video } from "./video";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface StreamPlayerProps {
  isFollowing: boolean;
  stream: any;
  user: any;
}

const StreamPlayer: FC<StreamPlayerProps> = ({ isFollowing, stream, user }) => {
  // const hlsUrl =
  //   "http://localhost:8000/live/" +
  //   stream?.currentVideo?.videoUrl +
  //   "/index.m3u8"; // Replace with your HLS stream URL

  const { collapsed } = useChatSidebar((state) => state);

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
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video
            hostName={user.userName}
            hostIdentity={user.userId}
            stream={stream}
          />
          {/* <Header 
                    hostName={user.username}
                    hostIdentity={user.id}
                    viewerIdentity={identity}
                    imageUrl={user.imageUrl}
                    isFollowing={isFollowing}
                    name={stream.name}
                    />
                    <InfoCard 
                    hostIdentity={user.id}
                    viewerIdentity={identity}
                    name={stream.name}
                    thumbnailUrl={stream.thumbnailUrl}
                    />
                    <AboutCard 
                    hostName={user.username}
                    hostIdentity={user.id}
                    viewerIdentity={identity}
                    bio={user.bio}
                    followedByCount={user._count.followedBy}
                    /> */}
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          {/* <Chat 
                        viewerName={name}
                        hostName={user.username}
                        hostIdentity={user.id}
                        isFollowing={isFollowing}
                        isChatEnabled={stream.isChatEnabled}
                        isChatDelayed={stream.isChatDelayed}
                        isChatFollowersOnly={stream.isChatFollowersOnly}
                        /> */}
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

export default StreamPlayer;
