Dashboard API Analysis Report
Based on a comprehensive review of the frontend dashboard components (AdminDashboard, AdminCourseApprovals, AdminUserRegistrations, AdminSettings, AdminAnnouncements) and the backend unispher_api codebase, here are the missing endpoints and discrepancies that need to be addressed to make the dashboard fully functional.

Missing Endpoints
These endpoints are actively called or needed by the frontend dashboard components but are missing from the backend implementation:

Notifications API

GET /api/notifications
Needed by: AdminDashboard.jsx (to load recent activity/notifications) and AdminCourseApprovals.jsx (to load pending course submissions).
PATCH /api/notifications/:id
Needed by: AdminDashboard.jsx (to mark notifications as read) and AdminCourseApprovals.jsx (to approve a course by resolving its notification).
University Settings API

PATCH /api/university/:id
Needed by: AdminSettings.jsx to "Save Changes" for the institution profile (Cover, Logo, Name, Domain, Bio). Currently, the backend only provides GET /api/university.
User Registration Management API

PATCH /api/user/:id/approve (or similar)
Needed by: AdminUserRegistrations.jsx to approve pending user applications. The frontend currently mocks this action with a local state update.
PATCH /api/user/:id/reject (or similar)
Needed by: AdminUserRegistrations.jsx to decline pending user applications.
Mismatched Endpoints (Discrepancies)
These endpoints are implemented differently between the frontend (or docs.md specifications) and the actual backend routing:

Connection Requests Actions
Frontend Expects / Calls:
PATCH /api/connections/request/:id/accept
PATCH /api/connections/request/:id/reject
Backend Actually Implements (connections.routes.ts):
PATCH /api/connections/:connection_id/accept
DELETE /api/connections/:connection_id/reject (Notice the use of DELETE rather than PATCH, and the path omits /request/).
Recommended Actions for the Backend
To synchronize the systems without touching the frontend logic, the following should be added to the backend:

Create a Notifications Module: Add routing for /api/notifications supporting GET (fetch for user) and PATCH /:id (mark read/resolved).
Expand University Module: Add an administrative PATCH / or PATCH /:id endpoint to update university details.
Expand User Module: Expose administrative endpoints to update a user's verification status from PENDING to VERIFIED/REJECTED.
Align Connection Routes: Update the backend connection routes (or add aliases) to support the paths PATCH /request/:id/accept and PATCH /request/:id/reject so the frontend doesn't throw 404s.
Dashboard API Analysis
Based on the analysis of the frontend dashboard components and the backend API routes, here are the missing endpoints and mismatches that need to be resolved. No code has been modified during this analysis.

1. Connection Requests (AdminDashboard.jsx)
There is a mismatch between what the frontend dashboard is requesting and what the backend is providing.

Frontend is calling:
PATCH /api/connections/request/:id/accept
PATCH /api/connections/request/:id/reject
Backend provides:
PATCH /api/connections/:connection_id/accept
DELETE /api/connections/:connection_id/reject
What should be added/fixed:
The frontend should be updated to drop the /request segment from the URL.
The frontend's handleRejectRequest should use the DELETE HTTP method instead of PATCH.
(Alternatively, alias endpoints could be added to the backend to match the frontend).
2. Course Approvals (AdminCourseApprovals.jsx)
The frontend currently only marks course-related notifications as read but doesn't actually update the course status (as noted in the source comments).

Frontend is lacking: Proper API calls in handleApprove and handleReject.
Backend is missing: Endpoints to handle admin approval or rejection of courses.
What should be added:
Backend: Add PATCH /api/courses/:course_id/approve
Backend: Add PATCH /api/courses/:course_id/reject
Frontend: Update handleApprove and handleReject to call these new endpoints using the course_id (available as row.entityId).
3. University Settings (AdminSettings.jsx)
The admin settings page allows editing university information, but the backend only supports fetching it.

Frontend is calling: PATCH /api/university/:id
Backend provides: GET /api/university (The PATCH endpoint does not exist).
What should be added:
Backend: Add PATCH /api/university/:university_id to src/university/university.routes.ts and implement the corresponding controller to update the university's details (name, established_year, domain, description, etc.).
4. User Registrations (AdminUserRegistrations.jsx)
The user registration page currently handles approvals and rejections entirely locally.

Frontend is lacking: API calls to approve/reject pending users (currently shows "Admin API action not available yet").
Backend is missing: Endpoints to approve or reject a user's registration.
What should be added:
Backend: Add PATCH /api/user/:user_id/approve
Backend: Add PATCH /api/user/:user_id/reject (or DELETE if the user is removed upon rejection).
Frontend: Update handleApprove and handleReject to hit these endpoints.
5. Announcements (AdminAnnouncements.jsx)
Status: Fully functional.
The frontend correctly uses GET /api/posts and POST /api/posts (with type="ANNOUNCEMENT"), which are fully supported by the backend. No changes required here