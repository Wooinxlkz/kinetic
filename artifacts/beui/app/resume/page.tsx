import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Wooinxlkz | Software Engineer & Tool Builder",
  description:
    "Software engineer building authentication systems, developer tooling, and automation pipelines. Mostly writing TypeScript and Python.",
};

export default function ResumePage() {
  return <ResumeClient />;
}
