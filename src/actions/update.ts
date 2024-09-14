// "use server";

// import { updateUser, updateUserProps } from "@/lib/user-service";
// import { revalidatePath } from "next/cache";

// export const updateUserInfo = async (
//   userId: string,
//   values: updateUserProps
// ) => {
//   try {
//     const result = await updateUser(userId, values);

//     // revalidatePath(`/u/${self.userName}/chat`);
//     revalidatePath(`/`);
//     revalidatePath(`/settings`);

//     return result;
//   } catch {
//     throw new Error("Internal Error");
//   }
// };
