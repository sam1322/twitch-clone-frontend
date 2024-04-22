import { getStreamByUserId } from "@/lib/stream-service";
import { ToggleCard } from "./_components/toggle-card";

interface ChatPageProps {}

const ChatPage = async ({}) => {
  const stream = await getStreamByUserId();
  if (!stream) {
    throw new Error("Stream not found");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Chat Settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard field="chatEnabled" label="Enable chat" stream={stream} />
        <ToggleCard field="chatDelayed" label="Delay chat" stream={stream} />
        <ToggleCard
          field="chatFollowerOnly"
          label="Must be following to chat"
          stream={stream}
        />
      </div>
    </div>
  );
};

export default ChatPage;
