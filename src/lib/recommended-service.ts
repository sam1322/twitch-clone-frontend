import { BASE_API_URL } from "@/constants/path";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { headerConfigServerSideFn } from "@/constants/config-serverside";

export const getRecommended = async () => {
  try {
    let userId;
    // try {
    //   const self = await getSelf();
    //   userId = self.id;
    // } catch (error) {
    //   userId = null;
    // }

    const token = getCookie("token", { cookies }) as string;
    const headers = headerConfigServerSideFn(token);

    await new Promise((resolve) => setTimeout(resolve, 400));
    const result = await axios.get(
      BASE_API_URL + "/api/v1/user/recommendations",
      headers
    );
    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Recommendation Error", error.response?.data);
    } else if (error instanceof Error) {
      console.error("Recommendation Error", error.message);
    }
  }
  return [];
};
