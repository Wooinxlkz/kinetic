"use client";

import type { CommunityCategory, CommunityComponentDTO, CommunityQuota } from "@/lib/community/types";

export class CommunityApiError extends Error {}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    throw new CommunityApiError(
      (data && typeof data.error === "string" && data.error) || "Something went wrong",
    );
  }
  return data as T;
}

export interface PublishInput {
  name: string;
  description: string;
  category: CommunityCategory;
  tags: string[];
  code: string;
  demoCode?: string;
}

export function fetchCommunityQuota(): Promise<CommunityQuota> {
  return request("/api/community/quota", { method: "GET" });
}

export function createCommunityComponent(input: PublishInput): Promise<CommunityComponentDTO> {
  return request("/api/community/components", { method: "POST", body: JSON.stringify(input) });
}

export function updateCommunityComponent(
  id: number,
  input: Partial<PublishInput>,
): Promise<CommunityComponentDTO> {
  return request(`/api/community/components/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}

export async function deleteCommunityComponent(id: number): Promise<void> {
  const res = await fetch(`/api/community/components/${id}`, {
    method: "DELETE",
    credentials: "same-origin",
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new CommunityApiError(
      (data && typeof data.error === "string" && data.error) || "Failed to delete",
    );
  }
}
