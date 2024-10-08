import { cva, type VariantProps } from "class-variance-authority";

import { cn, stringToColor } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LiveBadge from "@/components/live-badge";

// add custom avatar sizes
const avatarSizes = cva("", {
  variants: {
    size: {
      // default: "h-8 w-8",
      default: "h-10 w-10",
      lg: "h-14 w-14",
      md: "h-12 w-12",
      "2xl": "h-20 w-20",
      "4xl": "h-40 w-40",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  userName: string;
  imageUrl?: string;
  isLive?: boolean;
  showBadge?: boolean;
  className?: string;
}

export const UserAvatar = ({
  userName,
  imageUrl,
  isLive,
  showBadge,
  size,
  className,
}: UserAvatarProps) => {
  const canShowBadge = showBadge && isLive;

  const color = stringToColor(userName);

  return (
    <div className={cn("relative", className)}>
      <Avatar
        className={cn(
          isLive && "ring-2 ring-rose-500 border border-background",
          avatarSizes({ size })
        )}
      >
        <AvatarImage
          src={imageUrl}
          className="object-cover"
          referrerPolicy="no-referrer"
        />
        <AvatarFallback style={{ backgroundColor: color }}>
          {userName[0]}
          {userName[userName.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
  return <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />;
};
