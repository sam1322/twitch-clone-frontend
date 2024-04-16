"use client";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { FC, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
// import { useMediaQuery } from "@uidotdev/usehooks"; // some issue with SSR here

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  const matches = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};

export default Container;
