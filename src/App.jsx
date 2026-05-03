import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCourseApprovals from "./pages/AdminCourseApprovals";
import AdminUserRegistrations from "./pages/AdminUserRegistrations";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import AdminSettings from "./pages/AdminSettings";
import AdminRoute from "./components/auth/AdminRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard/course-approvals" element={<AdminCourseApprovals />} />
          <Route path="/dashboard/user-registrations" element={<AdminUserRegistrations />} />
          <Route path="/dashboard/announcements" element={<AdminAnnouncements />} />
          <Route path="/dashboard/settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;