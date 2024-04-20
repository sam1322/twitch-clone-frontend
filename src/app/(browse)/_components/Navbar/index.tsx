import { FC } from "react";
import Logo from "./logo";
import Search from "./search";
import Actions from "./actions";

interface NavbarProps {
  creatorDashboard?: boolean;
}

const Navbar: FC<NavbarProps> = ({ creatorDashboard = false }) => {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4  flex justify-between items-center shadow-sm">
      <Logo />
      {!creatorDashboard && <Search />}
      <Actions creatorDashboard={creatorDashboard} />
    </nav>
  );
};

export default Navbar;
