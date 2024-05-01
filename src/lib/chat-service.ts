import { headerConfig } from "@/constants/config";
import { BASE_API_URL } from "@/constants/path";
import axios, { isAxiosError } from "axios";

export const getChatByVideoId = async (videoId: string) => {
  try {
    const result = await axios.get(
      BASE_API_URL + `/api/v1/chat/history/${videoId}`,
      //   headerConfigServerSideFn(token)
      headerConfig
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
