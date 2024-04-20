import LogoutTooltip from "@/components/auth/LogoutTooltip";
import { Button } from "@/components/ui/button";
import { getSelf } from "@/lib/auth-service";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

const Actions = async ({}) => {
  const user = await getSelf();

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user ? (
        <Button size="sm" variant="primary" asChild>
          <Link href="/sign-in">Login</Link>
        </Button>
      ) : (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <LogoutTooltip user={user}/>
        </div>
      )}
    </div>
  );
};

export default Actions;
