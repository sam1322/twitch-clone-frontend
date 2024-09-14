"use server";

import { headerConfigServerSideFn } from "@/constants/config-serverside";
import { BASE_API_URL } from "@/constants/path";
import axios, { isAxiosError } from "axios";
import { getCookie } from "cookies-next";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getUserByUsername = async (userName: string) => {
  try {
    console.log("calling server actions");
    const result = await axios.get(
      BASE_API_URL + `/api/v1/user/username/${userName}`
    );
    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        return null;
      } else {
        console.log(
          "error username:",
          userName,
          error.response?.status,
          error.response?.data
        );
      }
    }
  }
  return null;
};

export interface updateUserProps {
  userName?: string;
  userImage?: string | null;
  bio?: string;
  // userLocation: string;
}

export const updateUser = async (value: updateUserProps) => {
  try {
    const token = getCookie("token", { cookies });

    if (!token) {
      throw new Error("Token not found");
    }
    const result = await axios.put(
      BASE_API_URL + `/api/v1/user/updateUser`,
      value,
      headerConfigServerSideFn(token)
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

// export type UploadUserPicProps = {
//   userImage: File;
// };

// export const uploadUserPic = async (value: UploadUserPicProps) => {
export const uploadUserPic = async (formData: FormData) => {
  try {
    console.log("hey you are calling server actions");
    const token = getCookie("token", { cookies });

    if (!token) {
      throw new Error("Token not found");
    }
    const newFormData = new FormData();
    // newFormData.append("userImage", formData.get("userImage") as Blob);
    // console.log("formData", formData);
    // console.log("formData",formData.get("userImage"))

    const result = await axios.post(
      BASE_API_URL + `/api/v1/user/userImage/upload`,
      // newFormData,
      formData,
      headerConfigServerSideFn(token)
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
