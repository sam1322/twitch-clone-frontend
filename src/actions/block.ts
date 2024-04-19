"use server";

import { revalidatePath } from "next/cache";
// import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";

// import { RoomServiceClient } from "livekit-server-sdk";

// const roomService = new RoomServiceClient(
//     process.env.LIVEKIT_API_URL!,
//     process.env.LIVEKIT_API_KEY!,
//     process.env.LIVEKIT_API_SECRET!,
// );

export const onBlock = async (id: string) => {
  // const self = await getSelf();

  let blockedUser;

  try {
    blockedUser = await blockUser(id);
  } catch (error) {
    // this means user is a guest
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  // console.log("blocked user" , blockedUser)
  // try {
  //     // remove guest from room using room service
  //     await roomService.removeParticipant(self.id, id)
  // } catch {
  //     // this means user is not in the room
  // }

  // revalidatePath(`/u/${self.username}/community`);

  revalidatePath("/");

  if (blockedUser) {
    revalidatePath(`/${blockedUser.endBlocker.fullName}`);
  }

  return blockedUser;
};

export const onUnblock = async (id: string) => {
  let unblockedUser;
  try {
    unblockedUser = await unblockUser(id);
    revalidatePath("/");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  if (unblockedUser) {
    revalidatePath(`/${unblockedUser.endBlocker.username}`);
  }

  return unblockedUser;
};
