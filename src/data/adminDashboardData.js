export const adminProfile = {
  portalName: "UniAdmin",
  portalSubtitle: "Administrator Portal",
  adminName: "Dr. Alex Thorne",
  adminRole: "Super Admin",
};

export const adminDashboardHeader = {
  breadcrumb: ["Home", "Dashboard"],
  title: "Dashboard Overview",
  subtitle: "Welcome back, Administrator. Here's what's happening on campus today.",
  actionLabel: "Post New Announcement",
};

export const adminSidebarLinks = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard", path: "/dashboard" },
  { id: "course-approvals", label: "Course Approvals", icon: "approvals", path: "/dashboard/course-approvals" },
  { id: "user-registrations", label: "User Registrations", icon: "registrations", path: "/dashboard/user-registrations" },
  { id: "announcements", label: "Announcements", icon: "announcements", path: "/dashboard/announcements" },
  { id: "settings", label: "Settings", icon: "settings", path: "/dashboard/settings" },
];

export const systemStatus = {
  title: "System Status",
  status: "All systems operational",
  tone: "healthy",
};

export const adminStats = [
  {
    id: "pending-course-approvals",
    title: "Pending Course Approvals",
    value: 12,
    icon: "approvals",
    accentColor: "#3b82f6",
    progress: 41,
    pill: "+2 new",
    pillTone: "positive",
  },
  {
    id: "new-student-registrations",
    title: "New Student Registrations",
    value: 45,
    icon: "registrations",
    accentColor: "#a855f7",
    progress: 62,
    pill: "+15 today",
    pillTone: "positive",
  },
  {
    id: "active-announcements",
    title: "Active Announcements",
    value: 8,
    icon: "announcements",
    accentColor: "#f97316",
    progress: 30,
    pill: "Active",
    pillTone: "neutral",
  },
];

export const pendingRequests = {
  title: "Pending Requests",
  ctaLabel: "View All",
  moreLabel: "Show 5 more requests",
  items: [
    {
      id: "req-1",
      title: "Introduction to Computer Science (CS101)",
      meta: "Submitted by Prof. Alan Smith",
      submittedAgo: "2 hours ago",
      icon: "book",
    },
    {
      id: "req-2",
      title: "Student ID Request: Sarah Jenkins",
      meta: "Engineering Department",
      submittedAgo: "4 hours ago",
      icon: "student",
    },
    {
      id: "req-3",
      title: "Advanced Macroeconomics (ECO305)",
      meta: "Submitted by Prof. Emily Chen",
      submittedAgo: "5 hours ago",
      icon: "book",
    },
  ],
};

export const recentActivity = {
  title: "Recent Activity",
  items: [
    {
      id: "act-1",
      title: "Announcement posted",
      description: '"Mid-term Schedule Update" was posted to all students.',
      time: "1 hour ago",
      tone: "info",
    },
    {
      id: "act-2",
      title: "New Faculty Added",
      description: "Dr. Robert Langdon joined the History Department.",
      time: "3 hours ago",
      tone: "success",
    },
    {
      id: "act-3",
      title: "System Maintenance",
      description: "Database optimization completed successfully.",
      time: "Yesterday",
      tone: "accent",
    },
    {
      id: "act-4",
      title: "Report Generated",
      description: "Monthly attendance report is ready for review.",
      time: "Yesterday",
      tone: "muted",
    },
  ],
};

export const notificationFilters = [
  { id: "all", label: "All" },
  { id: "approvals", label: "Approvals" },
  { id: "registrations", label: "Registrations" },
  { id: "system", label: "System" },
];

export const notifications = [
  {
    id: "not-1",
    category: "approvals",
    title: "New Course Proposal: Advanced Machine Learning",
    message:
      "Dr. Sarah Jenkins has submitted a new course syllabus for CS-501. Pending departmental review.",
    actionLabel: "Review",
    time: "10 min ago",
    icon: "approvals",
    tone: "orange",
  },
  {
    id: "not-2",
    category: "registrations",
    title: "Batch Registration Request: Engineering Faculty",
    message:
      "45 new faculty members are requesting portal access. Verification required against HR database.",
    time: "1 hour ago",
    icon: "registrations",
    tone: "violet",
  },
  {
    id: "not-3",
    category: "system",
    title: "System Maintenance Alert",
    message:
      "Scheduled database migration will occur tonight from 02:00 AM to 04:00 AM EST. Portal access will be interrupted.",
    time: "2 hours ago",
    icon: "warning",
    tone: "danger",
  },
  {
    id: "not-4",
    category: "approvals",
    title: "Syllabus Update: Introduction to Psychology",
    message:
      "Prof. Miller uploaded a revised syllabus for PSYC-101. Requires administrative sign-off for the fall semester catalog.",
    time: "Yesterday",
    icon: "approvals",
    tone: "orange",
  },
  {
    id: "not-5",
    category: "registrations",
    title: "Guest Lecturer Access Granted",
    message:
      "Temporary portal access has been provisioned for Dr. Alan Turing (Guest Speaker, CompSci Dept).",
    time: "Yesterday",
    icon: "registrations",
    tone: "violet",
  },
];
