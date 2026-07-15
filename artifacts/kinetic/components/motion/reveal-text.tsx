"use client";

import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import type { ElementType } from "react";

export interface RevealTextProps {
  text: string;
  className?: string;
  /** Stagger delay per word in seconds */
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}

export function RevealText({
  text,
  className,
  delay = 0.04,
  as = "p",
}: RevealTextProps) {
  const words = text.split(" ");
  const Tag = as as ElementType;

  return (
    <Tag className={cn("flex flex-wrap gap-x-[0.3em] gap-y-1", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.5,
            ease: EASE_OUT,
            delay: i * delay,
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
