import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Saurabh | Design Engineer & Product Builder",
  description:
    "Frontend engineer building tools for developers and crypto products. Works with React, Next.js, and Rust.",
};

export default function ResumePage() {
  return <ResumeClient />;
}
