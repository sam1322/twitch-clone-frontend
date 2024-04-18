import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import Actions from "./_components/actions";

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

  const userName = decodeURI(params.username);
  return (
    <div>
      <div>UserNamePage : {userName}</div>
      <div>User ID : {user.userId}</div>
      <div>is following : {`${isFollowing}`}</div>
      <Actions isFollowing={isFollowing} userId={user.userId} />
    </div>
  );
};

export default UserNamePage;
