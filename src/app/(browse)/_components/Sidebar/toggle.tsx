"use client";
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import {
  ArrowLeftFromLine,
  ArrowRight,
  ArrowRightFromLine,
} from "lucide-react";
import { FC } from "react";

interface ToggleProps {}

const Toggle: FC<ToggleProps> = ({}) => {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {!collapsed ? (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-primary">For you</p>
          <Hint label={label} side="right" asChild>
            <Button
              className="h-auto p-2 ml-auto"
              variant={"ghost"}
              onClick={onCollapse}
            >
              <ArrowLeftFromLine className="w-4 h-4" />
            </Button>
          </Hint>
        </div>
      ) : (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <Hint label={label} side="right" asChild>
            <Button variant={"ghost"} className="h-auto p-2" onClick={onExpand}>
              <ArrowRightFromLine className="w-4 h-4" />
            </Button>
          </Hint>
        </div>
      )}
{/* experimenting with the sidebar
      <div className="p-3 pl-6 mb-2 flex items-center w-full">
        <p
          className={cn(
            collapsed ? "opacity-0 w-0" : "opacity-1",
            "font-semibold text-primary"
          )}
        >
          For you
        </p>
        <Hint label={label} side="right" asChild>
          <Button
            className="h-auto p-2 ml-auto"
            variant={"ghost"}
            onClick={collapsed ? onExpand : onCollapse}
          >
            {collapsed ? (
              <ArrowRightFromLine className="w-4 h-4" />
            ) : (
              <ArrowLeftFromLine className="w-4 h-4" />
            )}
          </Button>
        </Hint>
      </div> */}

    </>
  );
};

export default Toggle;
