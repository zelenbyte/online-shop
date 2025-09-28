import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Protects routes from unauthorized access.
 * Redirects to the signin page if the user is not logged in.
 *
 * Props:
 * - user: current logged-in user object (null if not signed in)
 * - children: the protected component(s) to render
 */
function ProtectedRoute({ user, children }) {
  const location = useLocation();

  // If no user is logged in, redirect to signin with the attempted page and a message
  if (!user) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{
          from: location,               // stores the page user tried to access
          message: "You must be logged in to access this page."
        }}
      />
    );
  }

  // User is logged in, render the protected content
  return children;
}

export default ProtectedRoute;
