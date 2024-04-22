"use client";

import { useState, useTransition } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";

// import { updateStream } from "@/actions/stream";

type FieldTypes = "chatEnabled" | "chatDelayed" | "chatFollowerOnly";

interface ToggleCardProps {
  label: string;
  field: FieldTypes;
  value?: boolean;
  stream: any;
}

export const ToggleCard = ({ label, field, stream }: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();
  // const [value, setValue] = useState(false);

  const onChange = () => {
    // setValue(!value);
    startTransition(() => {
      updateStream({
        ...stream,
        [field]: !stream[field],
      })
        .then(() => toast.success("Chat settings updated!"))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    // <div className="rounded-xl bg-muted p-6">
    <div className="rounded-xl bg-[#27293278] p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            disabled={isPending}
            onCheckedChange={onChange}
            checked={stream[field]}
          >
            {stream[field] ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};
