"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT, SPRING_LAYOUT } from "@/lib/ease";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

type SortDir = "asc" | "desc";
type ColKey = "name" | "email" | "role" | "status" | "joined";
type Status = "Active" | "Inactive" | "Pending";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: Status;
  joined: string;
}

const USERS: User[] = [
  { id: 1, name: "Alice Martin", email: "alice@example.com", role: "Admin", status: "Active", joined: "2023-01-14" },
  { id: 2, name: "Bob Chen", email: "bob@example.com", role: "Developer", status: "Active", joined: "2023-03-08" },
  { id: 3, name: "Carol Singh", email: "carol@example.com", role: "Designer", status: "Pending", joined: "2023-06-21" },
  { id: 4, name: "David Kim", email: "david@example.com", role: "Developer", status: "Active", joined: "2022-11-05" },
  { id: 5, name: "Eva Lopez", email: "eva@example.com", role: "Manager", status: "Inactive", joined: "2022-08-30" },
  { id: 6, name: "Frank Nguyen", email: "frank@example.com", role: "Developer", status: "Active", joined: "2023-09-17" },
  { id: 7, name: "Grace Park", email: "grace@example.com", role: "Designer", status: "Active", joined: "2023-04-02" },
  { id: 8, name: "Henry Wu", email: "henry@example.com", role: "Admin", status: "Pending", joined: "2024-01-11" },
  { id: 9, name: "Iris Patel", email: "iris@example.com", role: "Developer", status: "Active", joined: "2023-07-19" },
  { id: 10, name: "Jack Thompson", email: "jack@example.com", role: "Manager", status: "Inactive", joined: "2022-05-28" },
  { id: 11, name: "Kira Okafor", email: "kira@example.com", role: "Designer", status: "Active", joined: "2023-10-03" },
  { id: 12, name: "Leo Fernandez", email: "leo@example.com", role: "Developer", status: "Active", joined: "2024-02-14" },
  { id: 13, name: "Maya Johansson", email: "maya@example.com", role: "Admin", status: "Pending", joined: "2023-12-07" },
  { id: 14, name: "Nathan Brooks", email: "nathan@example.com", role: "Developer", status: "Inactive", joined: "2022-10-25" },
  { id: 15, name: "Olivia Grant", email: "olivia@example.com", role: "Designer", status: "Active", joined: "2023-08-16" },
];

const PAGE_SIZE = 5;

const STATUS_STYLES: Record<Status, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Inactive: "bg-muted text-muted-foreground",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

const COLUMNS: { key: ColKey; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "joined", label: "Joined" },
];

export function DataTable() {
  const [sortKey, setSortKey] = useState<ColKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(0);
  const [pageDir, setPageDir] = useState<1 | -1>(1);
  const [sortVersion, setSortVersion] = useState(0);

  const sorted = useMemo(() => {
    return [...USERS].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const pageRows = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleSort = (key: ColKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(0);
    setSortVersion((v) => v + 1);
  };

  const goPage = (delta: 1 | -1) => {
    setPageDir(delta);
    setPage((p) => Math.max(0, Math.min(totalPages - 1, p + delta)));
  };

  return (
    <div className="w-full rounded-xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer select-none whitespace-nowrap"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    <motion.span
                      animate={{ rotate: sortKey === col.key && sortDir === "desc" ? 180 : 0 }}
                      transition={SPRING_LAYOUT}
                      className="inline-flex"
                    >
                      {sortKey === col.key ? (
                        <ChevronUp className="size-3.5 text-foreground" />
                      ) : (
                        <ChevronDown className="size-3.5 opacity-30" />
                      )}
                    </motion.span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="wait" initial={false}>
              <motion.tbody
                key={`${sortKey}-${sortDir}-${page}`}
                initial={{ opacity: 0, x: pageDir * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: pageDir * -24 }}
                transition={{ duration: 0.22, ease: EASE_OUT }}
              >
                {pageRows.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT, delay: i * 0.04 }}
                    className={cn(
                      "border-b border-border last:border-0 transition-colors",
                      i % 2 === 0 ? "bg-card" : "bg-muted/30",
                      "hover:bg-muted/60",
                    )}
                  >
                    <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{user.name}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{user.email}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{user.role}</td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", STATUS_STYLES[user.status])}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {new Date(user.joined).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <p className="text-xs text-muted-foreground">
          {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, USERS.length)} of {USERS.length}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => goPage(-1)}
            disabled={page === 0}
            className="flex size-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="px-2 text-xs text-muted-foreground">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => goPage(1)}
            disabled={page === totalPages - 1}
            className="flex size-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
