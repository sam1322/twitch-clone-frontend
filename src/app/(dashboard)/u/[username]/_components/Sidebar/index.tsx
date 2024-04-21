"use server";

import { getSelf } from "@/lib/auth-service";
import { Navigation } from "./navigation";
import { Toggle } from "./toggle";
import Wrapper from "./wrapper";

export const Sidebar = async () => {
  const user = await getSelf();

  return (
    <Wrapper>
      <Toggle />
      <Navigation user={user} />
    </Wrapper>
  );
};
