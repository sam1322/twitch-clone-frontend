import { headerConfigServerSideFn } from "@/constants/config-serverside";
import { BASE_API_URL } from "@/constants/path";
import axios, { isAxiosError } from "axios";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const getSelf = async () => {
  try {
    const token = getCookie("token", { cookies });
    if (!token) {
      throw new Error("Token not found");
    }

    const result = await axios.get(
      BASE_API_URL + "/api/v1/user/detail",
      headerConfigServerSideFn(token)
    );
    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      //   if (error.response?.status === 401) {
      // console.error("error", error.response?.status);
      // console.error("error", error.response?.data);
      throw new Error("User not found");
      // redirect to login
      //   }
    }
    if (error instanceof Error) {
      if (error.message === "Token not found") {
        throw new Error("Token not found");
      }
      throw new Error(error.message);
    }
  }
};
