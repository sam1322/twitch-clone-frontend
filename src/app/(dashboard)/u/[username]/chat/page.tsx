import { FC } from "react";
import { ToggleCard } from "./_components/toggle-card";

interface ChatPageProps {}

const ChatPage: FC<ChatPageProps> = ({}) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Chat Settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable chat"
          value={false}
          // value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Delay chat"
          // value={stream.isChatDelayed}
          value={false}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Must be following to chat"
          // value={stream.isChatFollowersOnly}
          value={false}
        />
      </div>
    </div>
  );
};

export default ChatPage;
