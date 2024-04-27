import { headerConfigServerSideFn } from "@/constants/config-serverside";
import { BASE_API_URL } from "@/constants/path";
import axios, { isAxiosError } from "axios";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const isFollowingUser = async (userId: string) => {
  try {
    const token = getCookie("token", { cookies });

    if (!token) {
      throw new Error("Token not found");
    }
    const result = await axios.get(
      BASE_API_URL + `/api/v1/follower/${userId}/isfollowing`,
      headerConfigServerSideFn(token)
    );
    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      // console.error("error status", error.response?.status);
      // console.error("error", error.response?.data);
    } else if (error instanceof Error) {
      console.error("error", error.message);
    }
    return false;
  }
};

export const followUser = async (userId: string) => {
  try {
    const token = getCookie("token", { cookies });

    if (!token) {
      throw new Error("Token not found");
    }
    const result = await axios.post(
      BASE_API_URL + `/api/v1/follower/${userId}/follow`,
      {},
      headerConfigServerSideFn(token)
    );
    return result.data;
  } catch (error) {
    let message = "Something went wrong";
    if (isAxiosError(error)) {
      message = error.response?.data?.message || "Internal Error";
    } else if (error instanceof Error) {
      message = error?.message || "Internal Error";
    }
    throw new Error(message);
  }
};

export const unfollowUser = async (userId: string) => {
  try {
    const token = getCookie("token", { cookies });

    if (!token) {
      throw new Error("Token not found");
    }

    const result = await axios.delete(
      BASE_API_URL + `/api/v1/follower/${userId}/unfollow`,
      headerConfigServerSideFn(token)
    );
    return result.data;
  } catch (error) {
    let message = "Something went wrong";
    if (isAxiosError(error)) {
      message = error.response?.data?.message || "Internal Error";
    } else if (error instanceof Error) {
      message = error?.message || "Internal Error";
    }
    throw new Error(message);
  }
};

export const getFollowedUsers = async () => {
  try {
    const token = getCookie("token", { cookies });

    if (!token) {
      throw new Error("Token not found");
    }

    const result = await axios.get(
      BASE_API_URL + `/api/v1/follower/followingList`,
      headerConfigServerSideFn(token)
    );
    return result.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error("error status", error.response?.status);
      console.error("error", error.response?.data);
    } else if (error instanceof Error) {
      console.error("error", error.message);
    }
    return [];
  }
};
