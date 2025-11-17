// frontend/src/components/auth/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

/**
 * ProtectedRoute
 * Wraps around components that require a logged-in user or admin.
 *
 * Usage:
 * <ProtectedRoute>
 *   <UserDashboard />
 * </ProtectedRoute>
 *
 * or for admin-only:
 * <ProtectedRoute adminOnly>
 *   <AdminDashboard />
 * </ProtectedRoute>
 */

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(UserContext);

  // Simple admin detection for demo mode (replace later when backend adds roles)
  const isAdmin = user?.email === "admin@example.com";

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
