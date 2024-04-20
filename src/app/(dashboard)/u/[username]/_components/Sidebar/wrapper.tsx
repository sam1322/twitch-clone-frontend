"use client";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { FC } from "react";
import { useIsClient } from "usehooks-ts";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  const { collapsed } = useSidebar((state) => state);

  return (
    <aside
      className={cn(
        // "transition-all duration-300 ease-in-out",
        "fixed left-0 flex flex-col w-60 h-full bg-background border-[#2D2E35] z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
