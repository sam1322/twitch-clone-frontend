import { Suspense } from "react";
import Container from "./_components/Container";
import Navbar from "./_components/Navbar";
import { Sidebar, SidebarSkeleton } from "./_components/Sidebar";

interface BrowseLayoutProps {
  children: React.ReactNode;
}

// export const dynamic = "force-dynamic";

const BrowseLayout = ({ children }: BrowseLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="h-full flex pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default BrowseLayout;
