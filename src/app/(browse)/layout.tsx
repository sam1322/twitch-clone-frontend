import { FC } from "react";
import Navbar from "./_components/Navbar";

interface BrowseLayoutProps {
  children: React.ReactNode;
}

const BrowseLayout: FC<BrowseLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="h-full flex pt-20">{children}</div>
    </>
  );
};

export default BrowseLayout;
