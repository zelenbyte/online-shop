import React from "react";
import { Navigate } from "react-router-dom";

/**
 * PublicRoute component
 * Prevents logged-in users from accessing pages meant for guests
 * (e.g., signin or register pages).
 *
 * Props:
 * - user: current logged-in user object (null if not signed in)
 * - children: the component(s) to render for guests
 */
function PublicRoute({ user, children }) {
  // Redirect logged-in users to their account page
  if (user) {
    return <Navigate to="/myaccount" replace />;
  }

  // If no user, render the guest-accessible content
  return children;
}

export default PublicRoute;
