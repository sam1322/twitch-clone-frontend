import { StreamPlayer } from "@/components/stream-player";
import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { getUserByUsername } from "@/lib/user-service";

interface PageProps {
  params: {
    username: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const user = await getUserByUsername(params.username);
  const viewer = await getSelf();
  const stream = await getStreamByUserId();

  return (
    <div className="h-full">
      <StreamPlayer
        user={user}
        viewer={viewer}
        isFollowing={true}
        stream={stream}
      />
    </div>
  );
};

export default Page;
