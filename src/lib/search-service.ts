import { headerConfig } from "@/constants/config";
import { headerConfigServerSideFn } from "@/constants/config-serverside";
import { BASE_API_URL } from "@/constants/path";
import axios, { isAxiosError } from "axios";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const getSearch = async (term?: string) => {
  try {
    const token = getCookie("token", { cookies }) as string;

    const result = await axios.post(
      BASE_API_URL + `/api/v1/search`,
      { term: term },
      headerConfigServerSideFn(token)
    );
    console.log("result", result.data);
    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        "error search",
        error?.response?.status,
        error.response?.data
      );
    } else if (error instanceof Error) {
      console.error("error search", error.message);
    }
  }
  return [];
};

// import { db } from "@/lib/db";
// import { getSelf } from "@/lib/auth-service";

// export const getSearch = async (term?: string) => {
//   let userId;

//   try {
//     const self = await getSelf();
//     userId = self.id;
//   } catch {
//     userId = null;
//   }

//   let streams = [];

//   if (userId) {
//     streams = await db.stream.findMany({
//       where: {
//         user: {
//           NOT: {
//             blocking: {
//               some: {
//                 blockedId: userId,
//               },
//             },
//           },
//         },
//         OR: [
//           {
//             name: {
//               contains: term,
//             },
//           },
//           {
//             user: {
//               username: {
//                 contains: term,
//               },
//             }
//           },
//         ],
//       },
//       select: {
//         user: true,
//         id: true,
//         name: true,
//         isLive: true,
//         thumbnailUrl: true,
//         updatedAt: true,
//       },
//       orderBy: [
//         {
//           isLive: "desc",
//         },
//         {
//           updatedAt: "desc",
//         },
//       ],
//     });
//   } else {
//     streams = await db.stream.findMany({
//       where: {
//         OR: [
//           {
//             name: {
//               contains: term,
//             },
//           },
//           {
//             user: {
//               username: {
//                 contains: term,
//               },
//             }
//           },
//         ],
//       },
//       select: {
//         user: true,
//         id: true,
//         name: true,
//         isLive: true,
//         thumbnailUrl: true,
//         updatedAt: true,
//       },
//       orderBy: [
//         {
//           isLive: "desc",
//         },
//         {
//           updatedAt: "desc",
//         },
//       ],
//     });
//   };

//   return streams;
// };
