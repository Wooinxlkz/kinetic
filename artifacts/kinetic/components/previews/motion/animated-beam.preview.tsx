"use client";

import { useRef } from "react";
import { AnimatedBeam } from "@/components/motion/animated-beam";
import { Brain, Database, Globe, Lock, Zap, Server } from "lucide-react";

function Node({
  nodeRef,
  icon: Icon,
  label,
  size = "md",
}: {
  nodeRef: React.RefObject<HTMLDivElement | null>;
  icon: React.ComponentType<{ className?: string }>;
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dims =
    size === "lg"
      ? "h-14 w-14"
      : size === "sm"
        ? "h-9 w-9"
        : "h-11 w-11";
  const iconDims =
    size === "lg" ? "h-6 w-6" : size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        ref={nodeRef}
        className={`flex ${dims} items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-sm`}
      >
        <Icon className={iconDims} />
      </div>
      {label && (
        <span className="text-[10px] text-muted-foreground">{label}</span>
      )}
    </div>
  );
}

export function AnimatedBeamPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const midLeftRef = useRef<HTMLDivElement>(null);
  const midRightRef = useRef<HTMLDivElement>(null);
  const botLeftRef = useRef<HTMLDivElement>(null);
  const botRightRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-64 w-full max-w-sm items-center justify-center"
    >
      {/* Center hub */}
      <div ref={centerRef} className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-primary shadow-md shadow-primary/20">
        <Brain className="h-6 w-6" />
      </div>

      {/* Left column */}
      <div className="absolute left-0 flex flex-col gap-6">
        <Node nodeRef={topLeftRef} icon={Globe} label="Web" size="sm" />
        <Node nodeRef={midLeftRef} icon={Database} label="DB" size="sm" />
        <Node nodeRef={botLeftRef} icon={Lock} label="Auth" size="sm" />
      </div>

      {/* Right column */}
      <div className="absolute right-0 flex flex-col gap-6">
        <Node nodeRef={topRightRef} icon={Server} label="API" size="sm" />
        <Node nodeRef={midRightRef} icon={Zap} label="Edge" size="sm" />
        <Node nodeRef={botRightRef} icon={Globe} label="CDN" size="sm" />
      </div>

      {/* Beams: left nodes → center */}
      <AnimatedBeam containerRef={containerRef} fromRef={topLeftRef} toRef={centerRef} curvature={0.3} duration={3} delay={0} />
      <AnimatedBeam containerRef={containerRef} fromRef={midLeftRef} toRef={centerRef} duration={3} delay={0.8} />
      <AnimatedBeam containerRef={containerRef} fromRef={botLeftRef} toRef={centerRef} curvature={-0.3} duration={3} delay={1.6} />

      {/* Beams: center → right nodes */}
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={topRightRef} curvature={-0.3} duration={3} delay={0.4} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={midRightRef} duration={3} delay={1.2} />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={botRightRef} curvature={0.3} duration={3} delay={2.0} />
    </div>
  );
}
