"use client";

// import { ConnectionState, Track } from "livekit-client";
// import {
//   useConnectionState,
//   useRemoteParticipant,
//   useTracks,
// } from "@livekit/components-react"

import { Skeleton } from "@/components/ui/skeleton";
import { OfflineVideo } from "./offline-video";
import { LoadingVideo } from "./loading-video";
import { LiveVideo } from "./LiveVideo";
import { useEffect, useState } from "react";

// import { OfflineVideo } from "./offline-video";
// import { LoadingVideo } from "./loading-video";
// import { LiveVideo } from "./live-video";

interface VideoProps {
  hostName: string;
  hostIdentity: string;
  stream: any;
  videoPage?: boolean;
}

export const Video = ({
  videoPage = true,
  hostName,
  hostIdentity,
  stream,
}: VideoProps) => {
  const connectionState = "connected";
  const [contentDiv, setContentDiv] = useState<any>(
    <LoadingVideo label={connectionState} />
  );
  // const connectionState = useConnectionState();
  // const participant = useRemoteParticipant(hostIdentity);
  // // get all tracks from the participant audio and video
  // const tracks = useTracks([
  //   Track.Source.Camera,
  //   Track.Source.Microphone,
  // ]).filter((track) => track.participant.identity === hostIdentity);

  // content variable to dynamically render the video
  // let content;

  // if (!participant && connectionState === ConnectionState.Connected) {
  // content = <OfflineVideo username={hostName} />;
  // } else if (!participant || tracks.length === 0) {
  // content = <LoadingVideo label={connectionState} />;
  // } else {
  // content = <LiveVideo participant={null} stream={stream} />;
  // };

  useEffect(() => {
    initialiseFn();
  }, []);

  // console.log("stream", stream);

  const initialiseFn = () => {
    let content;
    if (!stream?.live && !videoPage) {
      // if (!stream?.live && stream?.videoUrl === null) {
      content = <OfflineVideo username={hostName} />;
      setContentDiv(content);
    } else {
      // content = <LoadingVideo label={connectionState} />;
      setTimeout(() => {
        let content1 = <LiveVideo participant={null} stream={stream} />;
        setContentDiv(content1);
      }, 2000);
    }
    // setContentDiv(content);
  };

  return (
    // <div className="aspect-video border-b group relative ">
    // {/* <div className="aspect-video border-b group relative w-full h-full"> */}
    // <div className="aspect-video border-b group relative w-full lg:max-h-[96vh]">
    <div className="aspect-video border-b group relative w-full lg:max-h-[96%]">
      {/* {content} */}
      {contentDiv}
    </div>
  );
};

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
};
