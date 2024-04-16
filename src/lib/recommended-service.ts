import { BASE_API_URL } from "@/constants/path";
import axios from "axios";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
  try {
    let userId;
    try {
      const self = await getSelf();
      console.log("self", self);
      userId = self.id;
    } catch (error) {
      userId = null;
      console.error(error.message);
    }

    await new Promise((resolve) => setTimeout(resolve, 400));
    const result = await axios.get(
      BASE_API_URL + "/api/v1/user/recommendations"
    );
    // console.log("result", result.data);
    return result.data;
  } catch (error) {
    console.error(error);
  }
  return [];
};
