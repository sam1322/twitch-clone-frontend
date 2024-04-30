import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
// import Actions from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";
import { getSelf } from "@/lib/auth-service";
import { getVideoById } from "@/lib/feed-service";

interface UserNamePageProps {
  params: {
    videoId: string;
  };
}

const UserNamePage = async ({ params }: UserNamePageProps) => {
  // const user = await getUserByUsername(params.videoId);
  const video = await getVideoById(decodeURIComponent(params.videoId));
  // const user = await getSelf();
  const user = video?.user;
  // if (!user) {
  //   notFound();
  // }

  const isFollowing = await isFollowingUser(user?.userId);
  // const isBlocked = await isBlockedByUser(user.userId, false);
  // const isBlocking = await isBlockedByUser(user.userId);

  const viewer = await getSelf();

  // if (isBlocked) {
  //   notFound();
  // }

  // const userName = decodeURI(params.videoId);

  return (
    <StreamPlayer
      user={user}
      viewer={viewer}
      isFollowing={isFollowing}
      // stream={user?.currentStream}
      stream={video}
    />
  );
};

export default UserNamePage;
