import { FC } from "react";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import Container from "./_components/Container";

interface BrowseLayoutProps {
  children: React.ReactNode;
}

const BrowseLayout: FC<BrowseLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="h-full flex pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default BrowseLayout;
