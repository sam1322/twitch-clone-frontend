import LogoutTooltip from "@/components/auth/LogoutTooltip";
import { Button } from "@/components/ui/button";
import { getSelf } from "@/lib/auth-service";
import { Clapperboard, LogOut } from "lucide-react";
import Link from "next/link";

interface ActionsProps {
  creatorDashboard?: boolean;
}

const Actions = async ({ creatorDashboard = false }: ActionsProps) => {
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
            {creatorDashboard ? (
              <Link href="/">
                <LogOut className="h-5 w-5 mr-2" />
                Exit
              </Link>
            ) : (
              <Link href={`/u/${user.userName}`}>
                <Clapperboard className="h-5 w-5 lg:mr-2" />
                <span className="hidden lg:block">Dashboard</span>
              </Link>
            )}
          </Button>
          <LogoutTooltip user={user} />
        </div>
      )}
    </div>
  );
};

export default Actions;
