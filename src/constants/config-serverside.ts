import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const headerConfigServerSide = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getCookie("token", { cookies }),
  },
};
