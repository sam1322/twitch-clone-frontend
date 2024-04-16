import { BASE_API_URL } from "@/constants/path";
import axios from "axios";

export const getRecommended = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const result = await axios.get(
      BASE_API_URL + "/api/v1/user/recommendations"
    );
    return result.data;
  } catch (error) {
    console.error(error);
  }
  return [];
};
