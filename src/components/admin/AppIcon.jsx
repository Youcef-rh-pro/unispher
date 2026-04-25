import {
  Bell,
  BookOpen,
  Circle,
  ClipboardCheck,
  Cog,
  GraduationCap,
  Home,
  LayoutDashboard,
  Megaphone,
  PlusCircle,
  ShieldCheck,
  TriangleAlert,
  UserRound,
  UserRoundPlus,
  X,
  Check,
} from "lucide-react";

const iconMap = {
  dashboard: LayoutDashboard,
  approvals: ClipboardCheck,
  registrations: UserRoundPlus,
  announcements: Megaphone,
  settings: Cog,
  bell: Bell,
  home: Home,
  add: PlusCircle,
  shield: ShieldCheck,
  warning: TriangleAlert,
  book: BookOpen,
  student: GraduationCap,
  user: UserRound,
  close: X,
  check: Check,
};

export default function AppIcon({ name, className = "", strokeWidth = 1.9 }) {
  const Icon = iconMap[name] ?? Circle;

  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
