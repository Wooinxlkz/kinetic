import { ShieldAlert } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import { DevCenterView } from "@/components/app/dev-center/dev-center-view";

export default async function DevCenterPage() {
  const sessionUser = await getSessionUser();

  if (!sessionUser?.isDev) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3 px-4 py-24 text-center">
        <ShieldAlert className="h-8 w-8 text-muted-foreground" />
        <h1 className="text-lg font-semibold text-foreground">Access restricted</h1>
        <p className="text-sm text-muted-foreground">
          The Dev Center is only available to the developer account.
        </p>
      </div>
    );
  }

  return <DevCenterView />;
}
