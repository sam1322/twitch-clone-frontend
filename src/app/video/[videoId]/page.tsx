"use client";
import { headerConfig } from "@/constants/config";
import { BASE_API_URL } from "@/constants/path";
import axios from "axios";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const params = useParams<{ videoId: string }>();
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    fetchVideo();
  }, [params.videoId]);

  const fetchVideo = async () => {
    try {
      const result = await axios.get(
        BASE_API_URL + "/api/v1/stream/videos/" + params.videoId,
        headerConfig
      );
      const data = result.data;
      setUrl(data.videoUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-16">
      {params.videoId}
      <br />
      url : {url}
      <ReactPlayer controls url={"http://localhost:8000/live/" + url +"/index.m3u8"} />
    </div>
  );
};

export default page;
