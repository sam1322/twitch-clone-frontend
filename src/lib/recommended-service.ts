import { BASE_API_URL } from "@/constants/path";
import axios from "axios";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
  try {
    let userId;
    try {
      const self = await getSelf();
      userId = self.id;
    } catch (error) {
      userId = null;
    }

    await new Promise((resolve) => setTimeout(resolve, 400));
    const result = await axios.get(
      BASE_API_URL + "/api/v1/user/recommendations"
      // ,      headerConfigServerSide
    );
    return result.data;
  } catch (error) {
    console.error("Error", error);
  }
  return [];
};
