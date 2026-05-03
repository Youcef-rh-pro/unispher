import {
  Bell,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Circle,
  ClipboardCheck,
  Cog,
  GraduationCap,
  Home,
  LayoutDashboard,
  LayoutGrid,
  Menu,
  Megaphone,
  PlayCircle,
  PlusCircle,
  Search,
  Share2,
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
  apps: LayoutGrid,
  search: Search,
  menu: Menu,
  home: Home,
  add: PlusCircle,
  shield: ShieldCheck,
  warning: TriangleAlert,
  book: BookOpen,
  share: Share2,
  play: PlayCircle,
  student: GraduationCap,
  user: UserRound,
  close: X,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  check: Check,
};

export default function AppIcon({ name, className = "", strokeWidth = 1.9 }) {
  const Icon = iconMap[name] ?? Circle;

  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
