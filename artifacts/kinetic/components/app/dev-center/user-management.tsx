"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  ChevronDown,
  ChevronUp,
  Clock,
  Crown,
  Loader2,
  Search,
  ShieldCheck,
  ShieldOff,
  Sparkles,
  Star,
  Trash2,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminUserRow } from "@/lib/auth/db-users";

// ─── Types ───────────────────────────────────────────────────────────────────

type SubTab = "overview" | "users";
type PlanFilter = "all" | "free" | "pro" | "sponsor" | "lifetime" | "suspended";
type ValidPlan = "free" | "pro" | "sponsor" | "lifetime";

// ─── Data fetching ────────────────────────────────────────────────────────────

async function fetchUsers(): Promise<AdminUserRow[]> {
  const res = await fetch("/auth/admin/users", { credentials: "same-origin" });
  if (!res.ok) throw new Error("Failed to load users");
  return res.json();
}

async function patchSuspended(id: number, suspended: boolean): Promise<AdminUserRow> {
  const res = await fetch(`/auth/admin/users/${id}`, {
    method: "PATCH",
    credentials: "same-origin",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ suspended }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed");
  return data;
}

async function patchPlan(id: number, plan: ValidPlan, planExpiresAt: string | null): Promise<AdminUserRow> {
  const res = await fetch(`/auth/admin/users/${id}`, {
    method: "PATCH",
    credentials: "same-origin",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ plan, planExpiresAt }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed");
  return data;
}

async function removeUser(id: number): Promise<void> {
  const res = await fetch(`/auth/admin/users/${id}`, { method: "DELETE", credentials: "same-origin" });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to delete user");
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTimeLeft(planExpiresAt: string | null): { label: string; expired: boolean } | null {
  if (!planExpiresAt) return null;
  const diff = new Date(planExpiresAt).getTime() - Date.now();
  if (diff <= 0) return { label: "Expired", expired: true };
  const totalMins = Math.floor(diff / 60_000);
  const mins = totalMins % 60;
  const totalHrs = Math.floor(totalMins / 60);
  const hrs = totalHrs % 24;
  const days = Math.floor(totalHrs / 24);
  if (days > 0) return { label: `${days}d ${hrs}h left`, expired: false };
  if (hrs > 0) return { label: `${hrs}h ${mins}m left`, expired: false };
  return { label: `${mins}m left`, expired: false };
}

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const PLAN_BADGE: Record<string, { bg: string; text: string }> = {
  free:     { bg: "bg-muted/60",          text: "text-muted-foreground" },
  pro:      { bg: "bg-violet-500/15",     text: "text-violet-400" },
  sponsor:  { bg: "bg-amber-500/15",      text: "text-amber-400" },
  lifetime: { bg: "bg-emerald-500/15",    text: "text-emerald-400" },
};

const PLAN_ICON: Record<string, React.ElementType> = {
  free: Star,
  pro: Zap,
  sponsor: Sparkles,
  lifetime: Crown,
};

const ALL_PLANS: ValidPlan[] = ["free", "pro", "sponsor", "lifetime"];

// ─── Stats Overview ───────────────────────────────────────────────────────────

interface UserStatsProps { users: AdminUserRow[] }

function UserStats({ users }: UserStatsProps) {
  const total     = users.length;
  const free      = users.filter((u) => u.plan === "free"     && !u.isDev).length;
  const pro       = users.filter((u) => u.plan === "pro").length;
  const sponsor   = users.filter((u) => u.plan === "sponsor").length;
  const lifetime  = users.filter((u) => u.plan === "lifetime").length;
  const suspended = users.filter((u) => u.suspended).length;
  const devs      = users.filter((u) => u.isDev).length;

  const stats = [
    { label: "Total",     value: total,     sub: `${total - suspended} active`,          icon: Users,    ibg: "bg-accent/10",         ic: "text-accent"         },
    { label: "Free",      value: free,      sub: "Standard accounts",                    icon: Star,     ibg: "bg-muted/60",          ic: "text-muted-foreground" },
    { label: "Pro",       value: pro,       sub: "Paid subscribers",                     icon: Zap,      ibg: "bg-violet-500/10",     ic: "text-violet-400"     },
    { label: "Sponsor",   value: sponsor,   sub: "Team & company plans",                 icon: Sparkles, ibg: "bg-amber-500/10",      ic: "text-amber-400"      },
    { label: "Lifetime",  value: lifetime,  sub: "One-time purchase",                    icon: Crown,    ibg: "bg-emerald-500/10",    ic: "text-emerald-400"    },
    { label: "Suspended", value: suspended, sub: suspended > 0 ? "Needs review" : "All clear", icon: ShieldOff, ibg: "bg-red-500/10", ic: "text-red-400"   },
    { label: "Dev",       value: devs,      sub: "Developer accounts",                   icon: BarChart3, ibg: "bg-accent/10",        ic: "text-accent"         },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="flex items-start gap-3 rounded-xl border border-border bg-card/60 p-4">
            <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0", s.ibg)}>
              <Icon className={cn("h-4 w-4", s.ic)} />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-extrabold text-foreground leading-none">{s.value}</p>
              <p className="text-[11px] font-semibold text-foreground/80 mt-0.5">{s.label}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{s.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Tier Editor (inline inside expanded row) ─────────────────────────────────

interface TierEditorProps {
  row: AdminUserRow;
  onSave: (updated: AdminUserRow) => void;
  onClose: () => void;
}

function TierEditor({ row, onSave, onClose }: TierEditorProps) {
  const [plan, setPlan] = useState<ValidPlan>(row.plan as ValidPlan);
  const [expiresAt, setExpiresAt] = useState<string>(
    row.planExpiresAt ? new Date(row.planExpiresAt).toISOString().slice(0, 16) : "",
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const needsExpiry = plan === "pro" || plan === "sponsor";

  const PLAN_LABELS: Record<ValidPlan, string> = {
    free: "Free", pro: "Pro", sponsor: "Sponsor", lifetime: "Lifetime",
  };

  const PLAN_BTN: Record<ValidPlan, string> = {
    free:     "border-border data-[active=true]:bg-muted/60 data-[active=true]:text-foreground data-[active=true]:border-border",
    pro:      "border-violet-500/20 data-[active=true]:bg-violet-500/20 data-[active=true]:text-violet-400 data-[active=true]:border-violet-500/40",
    sponsor:  "border-amber-500/20 data-[active=true]:bg-amber-500/20 data-[active=true]:text-amber-400 data-[active=true]:border-amber-500/40",
    lifetime: "border-emerald-500/20 data-[active=true]:bg-emerald-500/20 data-[active=true]:text-emerald-400 data-[active=true]:border-emerald-500/40",
  };

  const handleSave = async () => {
    setSaving(true);
    setErr(null);
    try {
      const expiryIso = needsExpiry && expiresAt ? new Date(expiresAt).toISOString() : null;
      const updated = await patchPlan(row.id, plan, expiryIso);
      onSave(updated);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-3 rounded-xl border border-border bg-background/60 p-3">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Change Plan</p>

      {/* Plan buttons */}
      <div className="flex flex-wrap gap-1.5">
        {ALL_PLANS.map((p) => (
          <button
            key={p}
            type="button"
            data-active={plan === p}
            onClick={() => setPlan(p)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide transition-all text-muted-foreground hover:text-foreground",
              PLAN_BTN[p],
            )}
          >
            {PLAN_LABELS[p]}
          </button>
        ))}
      </div>

      {/* Expiry picker */}
      {needsExpiry && (
        <div className="space-y-1">
          <p className="text-[10px] font-semibold text-muted-foreground">
            Expires at <span className="font-normal">(leave blank = no expiry)</span>
          </p>
          <input
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-accent/50"
          />
        </div>
      )}

      {err && <p className="text-[11px] text-red-400">{err}</p>}

      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || plan === (row.plan as ValidPlan)}
          className="flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-3 py-1.5 text-[11px] font-bold text-accent transition-all hover:bg-accent/20 disabled:opacity-40"
        >
          {saving && <Loader2 className="h-3 w-3 animate-spin" />}
          Save
        </button>
        <button
          type="button"
          onClick={onClose}
          disabled={saving}
          className="rounded-lg border border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-all hover:bg-card"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── User List ────────────────────────────────────────────────────────────────

const PLAN_FILTERS: { id: PlanFilter; label: string }[] = [
  { id: "all",      label: "All"      },
  { id: "free",     label: "Free"     },
  { id: "pro",      label: "Pro"      },
  { id: "sponsor",  label: "Sponsor"  },
  { id: "lifetime", label: "Lifetime" },
  { id: "suspended",label: "Suspended"},
];

interface UserListProps {
  users: AdminUserRow[];
  onUpdate: (updated: AdminUserRow) => void;
  onDelete: (id: number) => void;
}

function UserList({ users, onUpdate, onDelete }: UserListProps) {
  const [search, setSearch]           = useState("");
  const [filter, setFilter]           = useState<PlanFilter>("all");
  const [busyId, setBusyId]           = useState<number | null>(null);
  const [expandedId, setExpandedId]   = useState<number | null>(null);
  const [editPlanId, setEditPlanId]   = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [actionErr, setActionErr]     = useState<string | null>(null);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const q = search.toLowerCase();
      const matchSearch = !q
        || u.name.toLowerCase().includes(q)
        || u.username.toLowerCase().includes(q)
        || u.email.toLowerCase().includes(q);
      const matchFilter =
        filter === "all"      ? true :
        filter === "suspended"? u.suspended :
        u.plan === filter;
      return matchSearch && matchFilter;
    });
  }, [users, search, filter]);

  const handleToggleSuspend = async (row: AdminUserRow) => {
    setBusyId(row.id);
    setActionErr(null);
    try {
      const updated = await patchSuspended(row.id, !row.suspended);
      onUpdate(updated);
    } catch (e) {
      setActionErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (row: AdminUserRow) => {
    setBusyId(row.id);
    setActionErr(null);
    try {
      await removeUser(row.id);
      onDelete(row.id);
      setConfirmDelete(null);
    } catch (e) {
      setActionErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search + filter */}
      <div className="flex flex-col gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, username, email…"
            className="w-full rounded-xl border border-border bg-muted/20 pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent/50"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {PLAN_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition-all",
                filter === f.id
                  ? "border-accent/30 bg-accent/10 text-accent"
                  : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground">
        Showing <span className="font-bold text-foreground">{filtered.length}</span> of {users.length} users
      </p>

      {actionErr && (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">{actionErr}</p>
      )}

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
          No users match.
        </div>
      )}

      <div className="space-y-2">
        {filtered.map((row) => {
          const isBusy          = busyId === row.id;
          const isExpanded      = expandedId === row.id;
          const isEditingPlan   = editPlanId === row.id;
          const isConfirmDelete = confirmDelete === row.id;
          const timeLeft        = formatTimeLeft(row.planExpiresAt);
          const showCountdown   = (row.plan === "pro" || row.plan === "sponsor") && timeLeft !== null;
          const planStyle       = PLAN_BADGE[row.plan] ?? PLAN_BADGE.free;
          const PlanIcon        = PLAN_ICON[row.plan] ?? Star;

          return (
            <div
              key={row.id}
              className={cn(
                "rounded-xl border border-border bg-card transition-all",
                row.suspended && "border-red-500/20 bg-red-500/5",
                isBusy && "pointer-events-none opacity-60",
              )}
            >
              {/* ── Main row ── */}
              <div className="flex items-center gap-3 px-4 py-3">
                {/* Avatar */}
                <div className={cn(
                  "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold uppercase",
                  row.suspended ? "bg-red-500/15 text-red-400" : "bg-accent/10 text-accent",
                )}>
                  {row.name.charAt(0)}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-sm font-semibold text-foreground">{row.name}</span>
                    <span className="text-[11px] text-muted-foreground">@{row.username}</span>
                    {row.isDev && <ShieldCheck className="h-3.5 w-3.5 text-accent" />}

                    {/* Plan badge */}
                    <span className={cn(
                      "flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                      planStyle.bg, planStyle.text,
                    )}>
                      <PlanIcon className="h-2.5 w-2.5" />
                      {row.plan}
                    </span>

                    {row.suspended && (
                      <span className="rounded-md border border-red-500/30 bg-red-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-400">
                        Suspended
                      </span>
                    )}
                  </div>

                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-muted-foreground">{row.email}</span>
                    {showCountdown && (
                      <span className={cn(
                        "flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                        timeLeft!.expired ? "bg-red-500/10 text-red-400" : "bg-muted/50 text-muted-foreground",
                      )}>
                        <Clock className="h-2.5 w-2.5" />
                        {timeLeft!.label}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-shrink-0 items-center gap-1">
                  {!row.isDev && (
                    <>
                      {/* Suspend toggle */}
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleToggleSuspend(row)}
                        title={row.suspended ? "Unsuspend" : "Suspend"}
                        className={cn(
                          "rounded-lg border p-1.5 transition-all disabled:opacity-50",
                          row.suspended
                            ? "border-emerald-500/20 text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10"
                            : "border-amber-500/20 text-amber-400 hover:border-amber-500/40 hover:bg-amber-500/10",
                        )}
                      >
                        {isBusy && !isConfirmDelete
                          ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          : row.suspended
                            ? <ShieldCheck className="h-3.5 w-3.5" />
                            : <ShieldOff className="h-3.5 w-3.5" />
                        }
                      </button>

                      {/* Delete */}
                      {!isConfirmDelete ? (
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => setConfirmDelete(row.id)}
                          title="Delete user"
                          className="rounded-lg border border-transparent p-1.5 text-muted-foreground transition-all hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      ) : (
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-medium text-red-400">Sure?</span>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => handleDelete(row)}
                            className="rounded-md border border-red-500/20 bg-red-500/10 px-2 py-1 text-[10px] font-bold text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-50"
                          >
                            {isBusy ? <Loader2 className="h-3 w-3 animate-spin" /> : "Yes"}
                          </button>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => setConfirmDelete(null)}
                            className="rounded-md border border-border px-2 py-1 text-[10px] font-medium text-muted-foreground hover:bg-card transition-all disabled:opacity-50"
                          >
                            No
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {/* Expand / collapse */}
                  <button
                    type="button"
                    onClick={() => {
                      const next = isExpanded ? null : row.id;
                      setExpandedId(next);
                      if (!next) setEditPlanId(null);
                    }}
                    className="rounded-lg border border-transparent p-1.5 text-muted-foreground transition-all hover:bg-muted hover:border-border"
                  >
                    {isExpanded
                      ? <ChevronUp className="h-3.5 w-3.5" />
                      : <ChevronDown className="h-3.5 w-3.5" />
                    }
                  </button>
                </div>
              </div>

              {/* ── Expanded panel ── */}
              {isExpanded && (
                <div className="border-t border-border mx-4 mb-4 pt-4 space-y-4">
                  {/* Detail grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "User ID",   value: `#${row.id}` },
                      { label: "Username",  value: `@${row.username}` },
                      { label: "Joined",    value: formatDate(row.createdAt) },
                      { label: "Status",    value: row.suspended ? "Suspended" : "Active" },
                      { label: "Plan",      value: row.plan.charAt(0).toUpperCase() + row.plan.slice(1) },
                      { label: "Expires",   value: row.planExpiresAt ? formatDate(row.planExpiresAt) : "No expiry" },
                      { label: "Dev",       value: row.isDev ? "Yes" : "No" },
                      { label: "Email",     value: row.email },
                    ].map((f) => (
                      <div key={f.label}>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{f.label}</p>
                        <p className="mt-0.5 text-xs font-semibold text-foreground break-all">{f.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tier editor — only for non-dev */}
                  {!row.isDev && (
                    <>
                      {!isEditingPlan ? (
                        <button
                          type="button"
                          onClick={() => setEditPlanId(row.id)}
                          className="rounded-lg border border-dashed border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-all hover:border-accent/40 hover:text-accent"
                        >
                          Change plan…
                        </button>
                      ) : (
                        <TierEditor
                          row={row}
                          onSave={(updated) => {
                            onUpdate(updated);
                            setEditPlanId(null);
                          }}
                          onClose={() => setEditPlanId(null)}
                        />
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Root UserManagement ──────────────────────────────────────────────────────

const SUB_TABS: { id: SubTab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview",      icon: BarChart3 },
  { id: "users",    label: "Manage Users",  icon: Users     },
];

export function UserManagement() {
  const [users, setUsers]         = useState<AdminUserRow[] | null>(null);
  const [loadErr, setLoadErr]     = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SubTab>("overview");
  // Tick every minute so countdowns refresh
  const [, setTick] = useState(0);

  useEffect(() => {
    fetchUsers().then(setUsers).catch((e) => setLoadErr(e.message));
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  const handleUpdate = (updated: AdminUserRow) => {
    setUsers((prev) => prev?.map((u) => (u.id === updated.id ? updated : u)) ?? null);
  };

  const handleDelete = (id: number) => {
    setUsers((prev) => prev?.filter((u) => u.id !== id) ?? null);
  };

  return (
    <div className="space-y-5">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
          <Users className="h-4 w-4 text-accent" />
        </div>
        <div>
          <h3 className="text-base font-bold text-foreground">User Management</h3>
          <p className="text-[11px] text-muted-foreground">Overview, stats, and control over all platform accounts</p>
        </div>
        {users && (
          <span className="ml-auto rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
            {users.length} total
          </span>
        )}
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1">
        {SUB_TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-all",
                activeTab === t.id
                  ? "border-accent/30 bg-accent/10 text-accent"
                  : "border-transparent text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Loading */}
      {!users && !loadErr && (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading users…
        </div>
      )}

      {/* Error */}
      {loadErr && (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">{loadErr}</p>
      )}

      {/* Content */}
      {users && activeTab === "overview" && <UserStats users={users} />}
      {users && activeTab === "users"    && (
        <UserList users={users} onUpdate={handleUpdate} onDelete={handleDelete} />
      )}
    </div>
  );
}
