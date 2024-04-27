import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";

interface ChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat: FC<ChatProps> = ({
  hostName,
  hostIdentity,
  viewerName,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}) => {
  const matches = useMediaQuery("(max-width: 1024px)");

  const { variant, onExpand } = useChatSidebar((state) => state);

  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  // const { chatMessages: messages, send } = useChat();

  // const reversedMessages = useMemo(() => {
  //   return messages.sort((a, b) => b.timestamp - a.timestamp);
  // }, [messages]);

  const onSubmit = () => {
    // if (!send) return;

    // send(value);
    setMessages([
      {
        timestamp: Date.now(),
        // name: "Sam",
        name: viewerName,
        message: value,
      },
      ...messages,
    ]);
    setValue("");
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const isHidden = !isChatEnabled;

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={messages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <ChatCommunity
          viewerName={viewerName}
          hostName={hostName}
          isHidden={isHidden}
        />
      )}
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
