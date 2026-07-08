"use client";

import { useState } from "react";
import { Trash2, LogOut, Settings } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/motion/dialog";
import { Button } from "@/components/motion/button";

export function DialogPreview() {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* Basic dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="md">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Account settings</DialogTitle>
            <DialogDescription>
              Manage your profile, notifications, and connected accounts.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {["Profile", "Notifications", "Security", "Integrations"].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm"
              >
                <span className="font-medium">{item}</span>
                <span className="text-xs text-muted-foreground">Configure →</span>
              </div>
            ))}
          </div>
          <DialogFooter>
            <DialogClose className="rounded-xl border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">
              Close
            </DialogClose>
            <Button variant="primary" size="sm">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Destructive confirm dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="md">
            <Trash2 className="h-4 w-4" />
            Delete account
          </Button>
        </DialogTrigger>
        <DialogContent maxWidth="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete account?</DialogTitle>
            <DialogDescription>
              This will permanently delete your account and all data. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose className="rounded-xl border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">
              Cancel
            </DialogClose>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setConfirmOpen(false)}
              className="bg-destructive hover:bg-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sign out */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="md">
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </DialogTrigger>
        <DialogContent maxWidth="max-w-xs">
          <DialogHeader>
            <DialogTitle>Sign out?</DialogTitle>
            <DialogDescription>You will be returned to the login screen.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose className="rounded-xl border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">
              Cancel
            </DialogClose>
            <Button variant="primary" size="sm">Sign out</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
