import { getCookie } from "cookies-next";

export const headerConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: getCookie("token") ? "Bearer " + getCookie("token") : null,
  },
};
