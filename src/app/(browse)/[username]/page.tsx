import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import Actions from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";
import { getSelf } from "@/lib/auth-service";

interface UserNamePageProps {
  params: {
    username: string;
  };
}

const UserNamePage = async ({ params }: UserNamePageProps) => {
  const user = await getUserByUsername(params.username);
  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.userId);
  const isBlocked = await isBlockedByUser(user.userId, false);
  const isBlocking = await isBlockedByUser(user.userId);

  const viewer = await getSelf();


  // if (isBlocked) {
  //   notFound();
  // }

  const userName = decodeURI(params.username);

  return (
    <StreamPlayer
      user={user}
      viewer={viewer}
      isFollowing={isFollowing}
      stream={user?.currentStream}
    />
  );

  return (
    <div>
      <div>UserNamePage : {userName}</div>
      <div>User ID : {user.userId}</div>
      <div>is following : {`${isFollowing}`}</div>
      <div>is blocked : {`${isBlocked}`}</div>
      <div>is blocking : {`${isBlocking}`}</div>
      <Actions
        isFollowing={isFollowing}
        isBlocking={isBlocking}
        userId={user.userId}
      />
    </div>
  );
};

export default UserNamePage;
