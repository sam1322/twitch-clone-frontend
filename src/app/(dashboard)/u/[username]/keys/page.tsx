import { getStreamByUserId } from "@/lib/stream-service";
import ConnectModal from "./_components/ConnectModal";
import { KeyCard } from "./_components/KeyCard";
import UrlCard from "./_components/UrlCard";

interface KeysPageProps {}

const KeysPage = async ({}) => {
  const rtmpServerHost = "localhost";
  const stream = await getStreamByUserId();
  
  // if (!stream) {
  //   throw new Error("Stream not found");
  // }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={"rtmp://" + rtmpServerHost + ":1935/app"} />
        <KeyCard value={stream?.streamKey} />
      </div>
    </div>
  );
};

export default KeysPage;
