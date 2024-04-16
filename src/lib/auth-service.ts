import { headerConfigServerSide } from "@/constants/config-serverside";
import { BASE_API_URL } from "@/constants/path";
import axios, { isAxiosError } from "axios";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const getSelf = async () => {
  try {
    const token = getCookie("token", { cookies });
    console.log("token", token);
    if (!token) {
      throw new Error("Token not found");
    }

    const result = await axios.get(
      BASE_API_URL + "/api/v1/user/detail",
      headerConfigServerSide
    );
    return result.data;
  } catch (error) {
    if (error.message === "Token not found") {
      throw new Error("Token not found");
    }
    if (isAxiosError(error)) {
      //   if (error.response?.status === 401) {
      throw new Error("User not found");
      // redirect to login
      //   }
    }
    throw new Error(error.message);
    console.error(error);
  }
};
