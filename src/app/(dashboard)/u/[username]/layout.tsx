import Container from "@/app/(browse)/_components/Container";
import Navbar from "@/app/(browse)/_components/Navbar";
import { getSelf } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import React, { FC } from "react";
import { Sidebar } from "./_components/Sidebar";
import { getUserByUsername } from "@/lib/user-service";

interface layoutProps {
  params: { username: string };
  children: React.ReactNode;
}

const layout: FC<layoutProps> = async ({ params, children }) => {
  // const user = await getSelf();
  const user = await getUserByUsername(decodeURIComponent(params.username));

  if (!user || user?.userName !== decodeURIComponent(params.username)) {
    redirect("/");
  }

  return (
    <>
      <Navbar creatorDashboard />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default layout;
