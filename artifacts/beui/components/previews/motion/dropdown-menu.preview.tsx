"use client";

import {
  Copy,
  Edit,
  ExternalLink,
  MoreHorizontal,
  Share2,
  Star,
  Trash2,
  User,
  LogOut,
  Settings,
  Bell,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/motion/dropdown-menu";
import { Button } from "@/components/motion/button";

export function DropdownMenuPreview() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8">
      {/* Actions menu */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Actions</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="md">
              Options
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>File</DropdownMenuLabel>
            <DropdownMenuItem icon={<Edit />}>Edit</DropdownMenuItem>
            <DropdownMenuItem icon={<Copy />} shortcut="⌘C">Duplicate</DropdownMenuItem>
            <DropdownMenuItem icon={<Star />}>Add to favourites</DropdownMenuItem>
            <DropdownMenuItem icon={<Share2 />}>Share</DropdownMenuItem>
            <DropdownMenuItem icon={<ExternalLink />}>Open in new tab</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Trash2 />} destructive>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Icon trigger */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Icon trigger</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem icon={<Edit />}>Rename</DropdownMenuItem>
            <DropdownMenuItem icon={<Copy />}>Copy link</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive icon={<Trash2 />}>Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Profile menu */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Profile</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="md">
              <User className="h-4 w-4" />
              Account
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>alex@example.com</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<User />} shortcut="⌘P">Profile</DropdownMenuItem>
            <DropdownMenuItem icon={<Settings />}>Settings</DropdownMenuItem>
            <DropdownMenuItem icon={<Bell />}>Notifications</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<LogOut />} destructive>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
