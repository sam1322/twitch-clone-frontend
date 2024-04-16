"use client";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { FC } from "react";
import { useIsClient } from "usehooks-ts";
import { RecommendedSkeleton } from "./recommended";
import { ToggleSkeleton } from "./toggle";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  const isClient = useIsClient();

  const { collapsed } = useSidebar((state) => state);

  console.log("Sidebar");

  if (!isClient)
    return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-[#21292a] border-r border-[#2D2E35] z-50">
        <ToggleSkeleton />
        {/* <FollowingSkeleton /> */}
        <RecommendedSkeleton />
      </aside>
    );

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
