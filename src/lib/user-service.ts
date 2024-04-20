import { BASE_API_URL } from "@/constants/path";
import axios from "axios";

export const getUserByUsername = async (userName: string) => {
  const result = await axios.get(
    BASE_API_URL + `/api/v1/user/username/${userName}`
  );
  return result.data;
};
