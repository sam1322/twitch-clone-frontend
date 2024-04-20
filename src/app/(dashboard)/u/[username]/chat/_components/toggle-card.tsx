"use client";

import { useState, useTransition } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";

// import { updateStream } from "@/actions/stream";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  label: string;
  field: FieldTypes;
  value?: boolean;
}

export const ToggleCard = ({
  label,
  // value = false,
  field,
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(false);

  const onChange = () => {
    setValue(!value);
    // startTransition(() => {
    //    updateStream({ [field]: !value })
    //     .then(() => toast.success("Chat settings updated!"))
    //     .catch(() => toast.error("Something went wrong"));
    // });
  };

  return (
    <div className="rounded-xl bg-muted bg-[#27293278] p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            disabled={isPending}
            onCheckedChange={onChange}
            checked={value}
          >
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};
