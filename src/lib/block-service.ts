import { headerConfigServerSideFn } from "@/constants/config-serverside";
import { BASE_API_URL } from "@/constants/path";
import axios, { isAxiosError } from "axios";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const isUserBlocked = async (userId: string) => {};

export const isBlockedByUser = async (userId: string, byUser = true) => {
  try {
    const token = getCookie("token", { cookies });

    if (!token) {
      throw new Error("Token not found");
    }
    const result = await axios.get(
      BASE_API_URL + `/api/v1/block/${userId}/isBlocked?byUser=${byUser}`,
      headerConfigServerSideFn(token)
    );
    // console.log("isBlockedByUser", result.data);
    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      // console.error("error status", error.response?.status);
    //   console.error("error", error.response?.data);
    } else if (error instanceof Error) {
      console.error("error", error.message);
    }
    return false;
  }
};

export const blockUser = async (userId: string) => {
  try {
    const token = getCookie("token", { cookies });

    if (!token) {
      throw new Error("Token not found");
    }
    const result = await axios.post(
      BASE_API_URL + `/api/v1/block/${userId}/block`,
      {},
      headerConfigServerSideFn(token)
    );
    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("error status", error.response?.status);
      console.error("error", error.response?.data);
    } else if (error instanceof Error) {
      console.error("error", error.message);
    }
    // throw error;
    throw new Error("Internal Error");
  }
};

export const unblockUser = async (userId: string) => {
  try {
    const token = getCookie("token", { cookies });

    if (!token) {
      throw new Error("Token not found");
    }

    const result = await axios.delete(
      BASE_API_URL + `/api/v1/block/${userId}/unblock`,
      headerConfigServerSideFn(token)
    );
    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      //   console.error("error status", error.response?.status);
      console.error("error", error.response?.data);
    } else if (error instanceof Error) {
      console.error("error", error.message);
    }
    return {};
  }
};

export const getBlockedUsers = async () => {
  try {
    const token = getCookie("token", { cookies });

    if (!token) {
      throw new Error("Token not found");
    }

    const result = await axios.get(
      BASE_API_URL + `/api/v1/block/blockedList`,
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
