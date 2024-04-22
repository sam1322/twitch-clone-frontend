"use client";
import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { FC, useState } from "react";

interface CopyButtonProps {
  value?: string;
}

const CopyButton: FC<CopyButtonProps> = ({ value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    if (!value) return;
    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button onClick={onCopy} disabled={!value || isCopied} variant={"ghost"}>
      <Icon className="h-4 w-4" />
    </Button>
  );
};

export default CopyButton;
