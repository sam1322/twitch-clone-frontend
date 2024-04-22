import { Input } from "@/components/ui/input";
import { FC } from "react";
import CopyButton from "./CopyButton";

interface UrlCardProps {
  value: string;
}

const UrlCard: FC<UrlCardProps> = ({ value }) => {
  return (
    <div className="rounded-xl bg-muted bg-[#27293278] p-6">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">Server Url</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              className="disabled:cursor-default"
              value={value || ""}
              disabled
              placeholder="Server Url"
            />
            <CopyButton value={value || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlCard;
