"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
// import { Participant, Track } from "livekit-client";
// import { useTracks } from "@livekit/components-react";
import { useEventListener } from "usehooks-ts";
import { FullscreenControl } from "./fullscreen-control";
import { VolumeControl } from "./volume-control";
import { cn } from "@/lib/utils";

// import { VolumeControl } from "./volume-control";
// import { FullscreenControl } from "./fullscreen-control";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface LiveVideoProps {
  //   participant: Participant;
  participant: any;
  stream: any;
}

export const LiveVideo = ({ participant, stream }: LiveVideoProps) => {
  const hlsUrl =
    "http://localhost:8000/live/" +
    stream?.currentVideo?.videoUrl +
    "/index.m3u8"; // Replace with your HLS stream URL

  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // isFullscreen state to track if the video is in fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false);
  // volume state to track the volume of the video
  const [volume, setVolume] = useState(0);

  // onVolumeChange function to update the volume state
  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  // toggleMute function to toggle the mute state
  const toggleMute = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  // toggleFullscreen function to toggle the fullscreen mode
  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  // handleFullscreenChange function to update the isFullscreen state
  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  };

  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

  // track is the video track from the participant
  //   useTracks([Track.Source.Camera, Track.Source.Microphone])
  //     .filter((track) => track.participant.identity === participant.identity)
  //     .forEach((track) => {
  //       if (videoRef.current) {
  //         track.publication.track?.attach(videoRef.current)
  //       }
  //     });

  return (
    // return the live video component with the volume control and fullscreen control
    <div ref={wrapperRef} className="relative h-full flex">
      <ReactPlayer
        url={hlsUrl}
        playing
        controls
        pip
        width="100%"
        // height="700px"
        // height="auto"
        // height="90vh"
        height={isFullscreen ? "100vh" : "90vh"}
      />

      {/* <video ref={videoRef} width="100%" /> */}
      <div
        className={cn(
          "absolute top-0  w-full opacity-0 hover:opacity-100 hover:transition-all",
          isFullscreen ? "h-[100vh]" : "h-[90vh]"
        )}
      >
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
          />
          <FullscreenControl
            isFullscreen={isFullscreen}
            onToggle={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  );
};
