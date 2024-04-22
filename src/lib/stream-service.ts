import { headerConfigServerSideFn } from "@/constants/config-serverside";
import { BASE_API_URL } from "@/constants/path";
import axios, { isAxiosError } from "axios";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const getStreamByUserId = async () => {
  try {
    const token = getCookie("token", { cookies });

    if (!token) {
      throw new Error("Token not found");
    }
    const result = await axios.get(
      BASE_API_URL + `/api/v1/stream/streamKey`,
      headerConfigServerSideFn(token)
    );
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

export const updateStreamKey = async (values: any) => {
  try {
    const token = getCookie("token", { cookies });

    if (!token) {
      throw new Error("Token not found");
    }

    const result = await axios.put(
      BASE_API_URL + `/api/v1/stream/updateStreamKey`,
      values,
      headerConfigServerSideFn(token)
    );
    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("error", error?.response?.status, error.response?.data);
    } else if (error instanceof Error) {
      console.error("error", error.message);
    }
    // throw error;
    throw new Error("Internal Error");
  }
};

export const generateStreamKey = async () => {
  try {
    const token = getCookie("token", { cookies });

    if (!token) {
      throw new Error("Token not found");
    }

    const result = await axios.post(
      BASE_API_URL + `/api/v1/stream/generateKey`,
      {},
      headerConfigServerSideFn(token)
    );
    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("error", error?.response?.status, error.response?.data);
    } else if (error instanceof Error) {
      console.error("error", error.message);
    }
    // throw error;
    throw new Error("Internal Error");
  }
};
