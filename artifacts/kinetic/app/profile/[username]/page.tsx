import { notFound } from "next/navigation";
import { findUserByUsername, getSessionUser, toPublicProfile } from "@/lib/auth";
import { ProfilePageClient } from "@/components/app/profile/profile-page-client";
import { getPublishQuota, getUserPublishedComponents } from "@/lib/community/db-community";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const [user, sessionUser] = await Promise.all([findUserByUsername(username), getSessionUser()]);

  if (!user) {
    notFound();
  }

  const profile = toPublicProfile(user);
  const isOwner = sessionUser?.id === user.id;

  const [publishedComponents, quota] = await Promise.all([
    getUserPublishedComponents(user.id, user),
    isOwner ? getPublishQuota(user.id, user.plan) : Promise.resolve(null),
  ]);

  return (
    <ProfilePageClient
      profile={profile}
      isOwner={isOwner}
      publishedComponents={publishedComponents}
      quota={quota}
    />
  );
}
