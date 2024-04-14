import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  return (
    <Link href="/">
      <div className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-full p-1">
          <Image src="/spooky.svg" alt="Gamehub" height="32" width="32" />
        </div>
        <div className={cn(font.className)}>
          <div className="text-lg font-semibold">Gamehub</div>
          <div className="text-xs text-muted-foreground">Let&apos;s play</div>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
