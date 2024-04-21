import Container from "@/app/(browse)/_components/Container";
import Navbar from "@/app/(browse)/_components/Navbar";
import { getSelf } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import React, { FC } from "react";
import { Sidebar } from "./_components/Sidebar";

interface layoutProps {
  params: { username: string };
  children: React.ReactNode;
}

const layout: FC<layoutProps> = async ({ params, children }) => {
  const user = await getSelf();

  if (!user || user?.userName !== params.username) {
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
