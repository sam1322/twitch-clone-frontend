// "use server";
// import { getCookie } from "cookies-next";
// import { cookies } from "next/headers";

// export const headerConfigServerSide = {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + getCookie("token", { cookies }),
//   },
// };
// TODO : fix this later
export const headerConfigServerSideFn = (token: string) => {
  // console.log("token1", token);
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? "Bearer " + token : null,
    },
  };
};
