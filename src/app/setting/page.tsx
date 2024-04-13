"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { headerConfig } from "@/constants/config";
import { BASE_API_URL } from "@/constants/path";
import axios, { isAxiosError } from "axios";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const rtmpServerHost = "localhost";
  const [loading, setLoading] = useState(false);
  const [streamKey, setStreamKey] = useState("");

  useEffect(() => {
    fetchStreamKey();
  }, []);

  const fetchStreamKey = async () => {
    try {
      console.log(headerConfig, "header");
      const result = await axios.get(
        BASE_API_URL + "/api/v1/streamKey",
        headerConfig
      );
      const data = result.data;
      setStreamKey(data.streamKey);
    } catch (error) {
      if (isAxiosError(error)) {
        const errorStatus = error.response?.status;
        let errorMessage = error.response?.data?.message;
        // show error message
        // if (errorStatus === 400) {
        //   toast.error(errorMessage);
        // } else {
        //   toast.error("Something went wrong");
        // }
      }
    }
  };

  const generateStreamKey = async () => {
    try {
      setLoading(true);
      const result = await axios.post(
        BASE_API_URL + "/api/v1/generateKey",
        null,
        headerConfig
      );
      const data = result.data;
      setStreamKey(data.streamKey);
    } catch (error) {
      if (isAxiosError(error)) {
        const errorStatus = error.response?.status;
        let errorMessage = error.response?.data?.message;
        if (errorStatus === 400) {
          toast.error(errorMessage);
        } else {
          toast.error("Something went wrong");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/2 h-1/2 bg-white shadow-lg rounded-lg">
        <Link href={"/dashboard"}>
          <Button>Go to Dashboard</Button>
        </Link>
        <div className="w-full h-16 bg-gray-200 flex justify-center items-center">
          <h1 className="text-2xl font-bold">Setting</h1>
        </div>
        <div className="w-full h-64 bg-gray-100 flex justify-center items-center">
          <h1 className="text-2xl flex flex-col gap-4">
            <Button onClick={generateStreamKey}>
              {loading ? "Generating..." : "Generate"}
            </Button>
            <Input readOnly value={"rtmp://" + rtmpServerHost + ":1935/app"} />
            <Input readOnly value={streamKey} />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default page;
