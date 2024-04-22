"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CopyButton from "./CopyButton";

interface KeyCardProps {
  value: string | null;
}

export const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-10">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              className="pl-0 disabled:cursor-default"
              value={value || ""}
              type={show ? "text" : "password"}
              disabled
              placeholder="No Stream key available, generate a new one"
            />
            <CopyButton value={value || ""} />
          </div>
          <Button
            onClick={() => setShow(!show)}
            className="pl-0"
            size="sm"
            variant="link"
          >
            {show ? "Hide" : "Show"}
          </Button>
        </div>
      </div>
    </div>
  );
};
