const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });

export function ProfileAbout({ bio, joinedAt }: { bio: string | null; joinedAt: string }) {
  return (
    <div className="space-y-3 rounded-2xl border border-border bg-card/40 p-4">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">About</h2>
      {bio ? (
        <p className="whitespace-pre-wrap text-sm text-foreground/90">{bio}</p>
      ) : (
        <p className="text-sm text-muted-foreground italic">No bio yet.</p>
      )}
      <p className="text-xs text-muted-foreground">Joined {dateFormatter.format(new Date(joinedAt))}</p>
    </div>
  );
}
