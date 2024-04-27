"use client";

import { format } from "date-fns";
// import { ReceivedChatMessage } from "@livekit/components-react";

import { stringToColor } from "@/lib/utils";

interface ChatMessageProps {
  data: any;
}

export const ChatMessage = ({ data }: ChatMessageProps) => {
  const userName = data.name;
  const color = stringToColor(userName || "");
  console.log(color, "data", data);

  return (
    <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
      <p className="text-sm text-white/40" title={format(data.timestamp,"HH:mm, dd MMMM yyyy")}>{format(data.timestamp, "HH:mm")}</p>
      <div className="flex flex-wrap items-baseline gap-1 grow">
        <p className="text-sm font-semibold whitespace-nowrap">
          <span className="truncate" style={{ color }}>
            {userName}
          </span>
          :
        </p>
        <p className="text-sm break-all">{data.message}</p>
      </div>
    </div>
  );
};
