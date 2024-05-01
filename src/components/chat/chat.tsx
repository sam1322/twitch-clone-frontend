import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";
import { CompatClient, Stomp, wsErrorCallbackType } from "@stomp/stompjs";
//@ts-expect-error
import SockJS from "sockjs-client";
import { BASE_API_URL } from "@/constants/path";
import { headerConfig } from "@/constants/config";
import { getChatByVideoId } from "@/lib/chat-service";
interface ChatProps {
  video: any;
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat: FC<ChatProps> = ({
  video,
  hostName,
  hostIdentity,
  viewerName,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}) => {
  console.log("video", video);
  const matches = useMediaQuery("(max-width: 1024px)");

  const { variant, onExpand } = useChatSidebar((state) => state);

  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState<CompatClient | null>(null);

  const connectHeaders = {
    Authorization: headerConfig.headers.Authorization,
  };

  useEffect(() => {
    const socket = new SockJS(BASE_API_URL + "/chat");
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      connectHeaders,
      () => {
        stompClient.subscribe(
          `/topic/chat/${video.videoId}`,
          onMessageReceived
        );
        // stompClient.subscribe("/topic/chat", onMessageReceived);
        // stompClient.subscribe("/topic/public", onMessageReceived);
      },
      onError
    );
    setStompClient(stompClient);

    return () => {
      stompClient.disconnect();
    };
  }, []);

  useEffect(() => {
    getChatHistory();
  }, []);

  const getChatHistory = async () => {
    try {
      const result = await getChatByVideoId(video.videoId);
      setMessages(result.reverse());
    } catch (error) {
      if (error instanceof Error) {
        console.error("error", error.message);
      }
    }
  };

  // @ts-ignore
  const onError = (err) => {
    // @ts-ignore
    console.error("error in chat message", err.headers.message);
  };

  const onMessageReceived = (payload) => {
    // console.log("message received", payload.body);
    const message = JSON.parse(payload.body);
    setMessages((prevMessages) => [message, ...prevMessages]);
  };

  const sendMessage = () => {
    if (stompClient && value) {
      const chatMessage = {
        message: value,
        videoId: video.videoId,
      };
      // stompClient.send(
      //   "/app/chatMessage",
      //   // "/app/chat.sendMessage",
      //   {},
      //   JSON.stringify(chatMessage)
      // );

      stompClient.publish({
        // destination: "/app/chatMessage",
        destination: `/app/chatMessage/${video.videoId}`,
        body: JSON.stringify(chatMessage),
        headers: connectHeaders,
      });

      setValue("");
    }
  };

  const onSubmit = () => {
    sendMessage();
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
