"use client";
import { headerConfig } from "@/constants/config";
import { BASE_API_URL } from "@/constants/path";
import axios from "axios";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    fetchVideo();
  }, []);

  const fetchVideo = async () => {
    try {
      const result = await axios.get(
        BASE_API_URL + "/api/v1/stream/videos",
        headerConfig
      );
      const data = result.data;
      setVideoList(data);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-start mt-10">
      <div className="w-1/3 flex flex-col items-center ">
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>
        <div className="mt-4">
          <p className="text-center">Welcome to the dashboard</p>
        </div>
        <Link href={"/setting"}>
          <Button>Go to Setting</Button>
        </Link>

        <div className="text-center mt-16">List of Videos</div>
        {videoList.map((video) => (
          <div key={video.videoId} className="mt-4">
            <Link href={"/video/" + video.videoId}>
              {/* <p>{video.videoId}</p> */}
              <ReactPlayer
                url={
                  "http://localhost:8000/live/" + video.videoUrl + "/index.m3u8"
                }
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
