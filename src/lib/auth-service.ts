"use server";
import { headerConfigServerSideFn } from "@/constants/config-serverside";
import { BASE_API_URL } from "@/constants/path";
import axios, { isAxiosError } from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { revalidatePath } from "next/cache";
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
    const user = result.data;
    if (user?.userName == null || user?.userName?.trim() == "") {
      user.userName = "User";
    }
    return user;
  } catch (error) {
    if (isAxiosError(error)) {
      //   if (error.response?.status === 401) {
      // console.error("error", error.response?.status);
      console.error("error", error.response?.data);
    } else if (error instanceof Error) {
      if (error.message === "Token not found") {
        // throw new Error("Token not found");
      } else {
        console.error("error", error.message);
      }

      // throw new Error(error.message);
    }
  }
  return null;
};

export const signOut = async () => {
  try {
    const token = getCookie("token", { cookies });
    if (!token) {
      throw new Error("Token not found");
    }

    // console.log("token", token);
    // revalidatePath("/");
    // return;
    const result = await axios.get(
      BASE_API_URL + "/api/v1/auth/logout",
      headerConfigServerSideFn(token)
    );
    console.log("user logged out successfully");
    deleteCookie("token", { cookies });
    revalidatePath("/");
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("error", error.response?.data);
    } else if (error instanceof Error) {
      console.error("error", error.message);
    }
  }
};
