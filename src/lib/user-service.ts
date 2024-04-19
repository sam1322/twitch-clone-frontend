import { BASE_API_URL } from "@/constants/path";
import axios, { isAxiosError } from "axios";

export const getUserByUsername = async (userName: string) => {
  try {
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
