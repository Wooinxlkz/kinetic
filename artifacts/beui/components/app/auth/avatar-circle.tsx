import { cn } from "@/lib/utils";
import type { AuthUser } from "./types";

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
}

export function AvatarCircle({
  user,
  size = 32,
  className,
}: {
  user: Pick<AuthUser, "name" | "avatarColor">;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold text-white select-none",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.42,
        backgroundColor: user.avatarColor,
      }}
      aria-hidden="true"
    >
      {getInitial(user.name)}
    </div>
  );
}
