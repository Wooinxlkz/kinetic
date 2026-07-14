import { cn } from "@/lib/utils";
import { objectStorageUrl } from "../profile/object-storage-url";
import type { AuthUser } from "./types";

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
}

export function AvatarCircle({
  user,
  size = 32,
  className,
}: {
  user: Pick<AuthUser, "name" | "avatarColor"> & { avatarUrl?: string | null };
  size?: number;
  className?: string;
}) {
  if (user.avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- storage-served, not a static asset
      <img
        src={objectStorageUrl(user.avatarUrl)}
        alt=""
        width={size}
        height={size}
        className={cn("shrink-0 rounded-full object-cover select-none", className)}
        style={{ width: size, height: size }}
      />
    );
  }

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
