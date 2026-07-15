import { Circle } from "lucide-react";
import { Badge, BadgeGroup } from "@/components/static/badge-group";

export function BadgeGroupPreview() {
  return (
    <div className="flex flex-col gap-6 p-6 w-full max-w-sm">
      <BadgeGroup>
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </BadgeGroup>
      <BadgeGroup>
        <Badge variant="success" size="sm" icon={<Circle className="h-2 w-2 fill-current" />}>
          Online
        </Badge>
        <Badge variant="warning" size="sm">Beta</Badge>
        <Badge variant="info" size="sm">New</Badge>
      </BadgeGroup>
    </div>
  );
}
