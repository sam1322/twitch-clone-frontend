import StreamPlayer from "@/components/stream-player";
import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";

interface PageProps {
  params: {
    username: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const user = await getSelf();
  const stream = await getStreamByUserId();

  return (
    <div className="h-full">
      <StreamPlayer user={user} isFollowing={true} stream={stream} />
    </div>
  );
};

export default Page;
