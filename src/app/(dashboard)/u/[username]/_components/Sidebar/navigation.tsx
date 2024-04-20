"use client";

import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";

import { NavItem, NavItemSkeleton } from "./nav-item";

export const Navigation = ({ user }: { user: any }) => {
  const pathname = usePathname();

  const routes = [
    {
      label: "Stream",
      href: `/u/${user?.userName}`,
      icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `/u/${user?.userName}/keys`,
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `/u/${user?.userName}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Community",
      href: `/u/${user?.userName}/community`,
      icon: Users,
    },
  ];

  if (!user?.userName) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};
