import { getCookie } from "cookies-next";

export const headerConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getCookie("token"),
  },
};
