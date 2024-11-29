// DashboardCardWeeklyPbs.tsx
import { IconTrophy } from "@tabler/icons-react";
import DashboardCardTemplate from "./DashboardCardTemplate";

export default function DashboardCardWeeklyPbs() {
  return (
    <DashboardCardTemplate
      title="Недельные достижения"
      icon={<IconTrophy className="text-danger" />}
    >
      ...
    </DashboardCardTemplate>
  );
}
