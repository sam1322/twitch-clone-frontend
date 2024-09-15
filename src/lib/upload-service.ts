"use client";
import { headerConfig } from "@/constants/config";
import { BASE_API_URL } from "@/constants/path";
import axios, { isAxiosError } from "axios";
import { getCookie } from "cookies-next";
import { revalidatePath } from "next/cache";
//
// export const uploadUserImage = async (formData: FormData) => {
export const uploadUserImage = async (file: File) => {
  try {
    console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);

    const result = await axios.post(
      BASE_API_URL + `/api/v1/user/userImage/upload`,
      formData,
      {
        headers: {
          Authorization: headerConfig.headers.Authorization,
          //   "Content-Type": "multipart/form-data",
        },
      }
    );
    revalidatePath("/");
    revalidatePath("/settings");
    return result.data;
  } catch (error) {
    let message = "Something went wrong";
    if (isAxiosError(error)) {
      console.error(
        "error update",
        error.response?.status,
        error.response?.data
      );
      message = error.response?.data?.message || message;
    } else if (error instanceof Error) {
      console.error("error update", error.message);
    }
    throw new Error(message);
  }
  // return null;
};
