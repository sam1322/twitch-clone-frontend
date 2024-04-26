"use server";

import { revalidatePath } from "next/cache";

import { followUser, unfollowUser } from "@/lib/follow-service";

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/${followedUser.endFollower.fullName}`);
    }

    return followedUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message || "Internal Error");
    }
  }
};

export const onUnfollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);

    revalidatePath("/");

    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.endFollower.fullName}`);
    }

    return unfollowedUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message || "Internal Error");
    }
  }
};
