import { UserProfileCard } from "@/components/motion/user-profile-card";

export function UserProfileCardPreview() {
  return (
    <div className="flex items-center justify-center p-6 w-full">
      <UserProfileCard
        name="Jordan Rivera"
        username="jordanr"
        bio="Building tools for developers. Open source enthusiast. Coffee-driven."
        location="San Francisco, CA"
        website="https://jordanr.dev"
        stats={[
          { label: "Followers", value: "2.4k" },
          { label: "Following", value: "318" },
          { label: "Projects", value: "42" },
        ]}
      />
    </div>
  );
}
