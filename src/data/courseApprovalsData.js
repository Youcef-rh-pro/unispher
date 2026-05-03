export const courseApprovalsHeader = {
  title: "Course Approvals",
  subtitle: "Review and manage incoming course submissions for the upcoming semester.",
};

export const courseApprovalFilters = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending", count: 12 },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

export const courseApprovalRows = [
  {
    id: "course-1",
    title: "Introduction to Data Structures",
    meta: "COMP-201 • Dept. of Computer Science",
    instructor: "Dr. Sarah Jenkins",
    instructorAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAWmDm_eIhqZTknh4KfpU3XQtzm-8DHHVyBJPOYLrBqxC9ISaCVg-pMkN8DI15CzXKjhfeyhHmjlu3y6thRVbv-B-0dFqW9XMaJGLOhovHy5b0bzJ6GY6H9bvMTkSQq5hMVRA3IXjlVSGV32bt5EVMR8Rkouve5dnRveFS1eMpRA4I6T-DUFxn3JNGJSbKaYw3HaIfHuk_yxznbeVP6eQME8lyZIpzkmKE_gX-hqdeRJSDl_s0pwCrSM6EmMT1RoKilGrxZOE3d8mg",
    type: "Core Material",
    typeIcon: "book",
    submitted: "Oct 24, 2023",
  },
  {
    id: "course-2",
    title: "Modern European History",
    meta: "HIST-340 • Dept. of History",
    instructor: "Prof. M. Thorne",
    instructorAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAfMljAxHv-VLAXTPSFfFlOv1Ym57XAIFHjVZcg_QTfVbHNpVJAY2ndQkdvlt-RS9jBrl87pH3KLkKMCT2oMTfBvXGkKovYiGXq2FqrQzaMVKVqrcq61wnm_ZxEYrNw9qntxpmk_ChYu9M-IpMoy3XHuZhA0Y3Im9gCJpV9zP0QraFFBDkprV8xqeuR_pWve_ECsUeTapLoUM75h2bybyD_cTlphkaqTL2LthSjG_EQeUj902H0k_finCERm6dN8tBLSZbFsMAPnlk",
    type: "Resource Sharing",
    typeIcon: "share",
    submitted: "Oct 23, 2023",
  },
  {
    id: "course-3",
    title: "Quantum Mechanics I",
    meta: "PHYS-401 • Dept. of Physics",
    instructor: "Dr. Alice Lin",
    instructorInitials: "AL",
    instructorTone: "bg-amber-500",
    type: "Core Material",
    typeIcon: "book",
    submitted: "Oct 21, 2023",
  },
  {
    id: "course-4",
    title: "Advanced Graphic Design",
    meta: "ART-350 • School of Fine Arts",
    instructor: "Prof. E. Rostova",
    instructorAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCrafDTLug8YztYd57VuUycg5qRIhIR6gHYaykLddHoVMJvNlIwNUlz0Nn_IAIEb-Z8J1uSiYeRLkbx-P6ieg4dWNyt5EXAnD2YiywRS8-k6jfUYJUT2X2bZ3RslvfNlL48-C27qBg4Uf75nq3fuNDcnsMtQXMUp883qChZ2B0Mm1jZUK2KWmJcMzvwr5C1DHKOPoEEuQbP_PSCq3mIr2PLgGvoyVNtQ4dLy0ShYpcHsALtM83p8RMnqupFWqQ35ELYI3ddne93VUE",
    type: "Multimedia",
    typeIcon: "play",
    submitted: "Oct 20, 2023",
  },
];
