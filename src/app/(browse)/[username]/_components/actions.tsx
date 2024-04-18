"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { FC, useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

const Actions: FC<ActionsProps> = ({ isFollowing, userId }) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => {
          toast.success(`You are now following ${data.endFollower.fullName}`);
        })
        .catch((error) => {
          console.error("error", error.message);
          toast.error("Something went wrong");
        });
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => {
          toast.success(`You have unfollowed ${data.endFollower.fullName}`);
        })
        .catch((error) => {
          console.error("error", error.message);
          toast.error("Something went wrong");
        });
    });
  };

  const onClickFollow = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <>
      <Button disabled={isPending} variant="primary" onClick={onClickFollow}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </>
  );
};

export default Actions;
