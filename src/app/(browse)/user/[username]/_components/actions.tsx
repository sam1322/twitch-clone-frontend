"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { FC, useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  isBlocking: boolean;
  userId: string;
}

const Actions: FC<ActionsProps> = ({ isFollowing, isBlocking, userId }) => {
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

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`Blocked the user ${data.endBlocker.fullName}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) =>
          toast.success(`Unblocked the user ${data.endBlocker.fullName}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onClickBlock = () => {
    if (isBlocking) {
      handleUnblock();
    } else {
      handleBlock();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button disabled={isPending} variant="primary" onClick={onClickFollow}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>

      <Button onClick={onClickBlock} disabled={isPending}>
        {isBlocking ? "Unblock" : "Block"}
      </Button>
    </div>
  );
};

export default Actions;
