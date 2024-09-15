import { headerConfigServerSideFn } from "@/constants/config-serverside";
import { BASE_API_URL } from "@/constants/path";
import axios, { isAxiosError } from "axios";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const getStreams = async () => {
  // return [];
  try {
 
    const result = await axios.get(
      BASE_API_URL + `/api/v1/stream/videos/all`
      // headerConfigServerSideFn(token)
    );
    // console.log("result", result.data);
    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      //   console.error("error status", error.response?.status);
      console.error("error", error?.response?.status, error.response?.data);
    } else if (error instanceof Error) {
      console.error("error", error.message);
    }
    // throw error;
    // throw new Error("Internal Error");
  }
};

export const getVideoById = async (videoId: string) => {
  try {
    const result = await axios.get(
      BASE_API_URL + `/api/v1/stream/videos/${videoId}`
    );
    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("error", error?.response?.status, error.response?.data);
    } else if (error instanceof Error) {
      console.error("error", error.message);
    }
  }
};
