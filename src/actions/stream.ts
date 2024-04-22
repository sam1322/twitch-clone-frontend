"use server";

import { getSelf } from "@/lib/auth-service";
import { generateStreamKey, updateStreamKey } from "@/lib/stream-service";
// import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

// import { db } from "@/lib/db";
// import { getSelf } from "@/lib/auth-service";

export const updateStream = async (values: any) => {
  try {
    const self = await getSelf();

    const validData = {
      chatEnabled: values.chatEnabled,
      chatFollowerOnly: values.chatFollowerOnly,
      chatDelayed: values.chatDelayed,
      // chatFollowerOnly: values.chatFollowerOnly && values.chatEnabled,
      // chatDelayed: values.chatDelayed && values.chatEnabled,
    };

    const result = await updateStreamKey(validData);

    revalidatePath(`/u/${self.userName}/chat`);
    revalidatePath(`/u/${self.userName}`);
    revalidatePath(`/${self.userName}`);

    return result;
  } catch {
    throw new Error("Internal Error");
  }
};

export const generateNewStreamKey = async () => {
  try {
    const self = await getSelf();

    const result = await generateStreamKey();

    revalidatePath(`/u/${self.userName}/keys`);

    return result;
  } catch {
    throw new Error("Internal Error");
  }
};
