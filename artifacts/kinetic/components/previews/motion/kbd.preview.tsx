import { Kbd, KbdShortcut } from "@/components/static/kbd";

export function KbdPreview() {
  return (
    <div className="flex flex-col gap-4 p-6 items-start">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Single key:</span>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
        <Kbd>Esc</Kbd>
        <Kbd>Enter</Kbd>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Shortcuts:</span>
        <KbdShortcut keys={["⌘", "K"]} />
        <KbdShortcut keys={["⌃", "⇧", "P"]} />
        <KbdShortcut keys={["⌥", "F4"]} />
      </div>
    </div>
  );
}
