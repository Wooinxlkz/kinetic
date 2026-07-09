"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ColorOrb } from "./color-orb";

// ─── constants ────────────────────────────────────────────────────────────────

const FORM_WIDTH = 360;
const FORM_HEIGHT = 200;

// Faster, snappier spring — higher stiffness, lower mass
const SPRING = {
  type: "spring",
  stiffness: 620,
  damping: 38,
  mass: 0.55,
} as const;

// ─── context ──────────────────────────────────────────────────────────────────

interface ContextShape {
  showForm: boolean;
  triggerOpen: () => void;
  triggerClose: () => void;
}

const FormContext = React.createContext({} as ContextShape);
const useFormContext = () => React.useContext(FormContext);

// ─── MorphPanel ───────────────────────────────────────────────────────────────

export function MorphPanel() {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const [showForm, setShowForm] = React.useState(false);

  const triggerClose = React.useCallback(() => {
    setShowForm(false);
    textareaRef.current?.blur();
  }, []);

  const triggerOpen = React.useCallback(() => {
    setShowForm(true);
    setTimeout(() => textareaRef.current?.focus());
  }, []);

  React.useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (
        showForm &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        triggerClose();
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [showForm, triggerClose]);

  const ctx = React.useMemo(
    () => ({ showForm, triggerOpen, triggerClose }),
    [showForm, triggerOpen, triggerClose],
  );

  return (
    <FormContext.Provider value={ctx}>
      {/*
        No outer fixed-size wrapper — the motion.div IS the pill/panel.
        It anchors to bottom-right via layout.tsx and grows upward when expanded.
      */}
      <motion.div
        ref={wrapperRef}
        // Glass — same visual language as the dock
        className="relative flex flex-col items-center overflow-hidden border border-foreground/[0.07] bg-card/80 shadow-2xl backdrop-blur-xl"
        initial={false}
        animate={{
          width: showForm ? FORM_WIDTH : "auto",
          height: showForm ? FORM_HEIGHT : 44,
          borderRadius: showForm ? 14 : 22,
        }}
        transition={{ ...SPRING, delay: 0 }}
        style={{ originY: 1 }} // grow upward from the bottom edge
      >
        <DockBar />
        <InputForm ref={textareaRef} />
      </motion.div>
    </FormContext.Provider>
  );
}

// ─── DockBar (collapsed pill) ─────────────────────────────────────────────────

function DockBar() {
  const { showForm, triggerOpen } = useFormContext();
  return (
    <footer className="mt-auto flex h-[44px] shrink-0 items-center whitespace-nowrap select-none">
      <div className="flex items-center gap-2 px-3">
        {/* Orb fades out when the form is open */}
        <AnimatePresence mode="wait">
          {!showForm && (
            <motion.div
              key="orb"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <ColorOrb dimension="22px" />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={triggerOpen}
          className="cursor-pointer rounded-full px-1 py-0.5 text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
        >
          Ask AI
        </button>
      </div>
    </footer>
  );
}

// ─── InputForm (expanded panel) ───────────────────────────────────────────────

function InputForm({ ref }: { ref: React.Ref<HTMLTextAreaElement> }) {
  const { triggerClose, showForm } = useFormContext();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    triggerClose();
  }

  function handleKeys(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Escape") triggerClose();
    if (e.key === "Enter" && e.metaKey) {
      e.preventDefault();
      btnRef.current?.click();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute bottom-0 left-0"
      style={{
        width: FORM_WIDTH,
        height: FORM_HEIGHT,
        pointerEvents: showForm ? "all" : "none",
      }}
    >
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.13 }}
            className="flex h-full flex-col p-1.5"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-1 py-1">
              <div className="flex items-center gap-2">
                <ColorOrb dimension="20px" />
                <span className="text-xs font-medium text-foreground/70 select-none">
                  Kinetic AI
                </span>
              </div>
              <button
                type="submit"
                ref={btnRef}
                className="flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-0.5 text-muted-foreground/60 transition-colors hover:text-muted-foreground"
              >
                <KeyHint>⌘</KeyHint>
                <KeyHint>↵</KeyHint>
              </button>
            </div>

            {/* Textarea */}
            <textarea
              ref={ref}
              placeholder="Ask me anything..."
              name="message"
              required
              spellCheck={false}
              onKeyDown={handleKeys}
              className="h-full w-full resize-none rounded-lg bg-transparent p-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

// ─── KeyHint ──────────────────────────────────────────────────────────────────

function KeyHint({ children }: { children: string }) {
  return (
    <kbd className="inline-flex h-[18px] items-center justify-center rounded border border-border/50 px-1 font-sans text-[10px] text-muted-foreground/70 leading-none">
      {children}
    </kbd>
  );
}

export default MorphPanel;
