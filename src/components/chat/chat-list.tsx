import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import { ChatMessage } from "./chat-message";

interface ChatListProps {
  messages: any[];
  isHidden: boolean;
}

export const ChatList: FC<ChatListProps> = ({ messages = [], isHidden }) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? "Chat is disabled" : "Welcome to the chat!"}
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((message) => (
        <ChatMessage key={message.timestamp} data={message} />
      ))}
    </div>
  );
};

export const ChatListSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1/2 h-6" />
    </div>
  );
};
