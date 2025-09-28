import React from "react";
import { Link } from "react-router-dom";

/**
 * NotFound Page
 * Displays a friendly 404 message with navigation options.
 */
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
      {/* Illustration / Emoji */}
      <div className="text-9xl mb-6 select-none">🛒</div>

      {/* Main Heading */}
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>

      {/* Subheading */}
      <p className="text-xl text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Go Home
        </Link>
        <Link
          to="/cart"
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
        >
          View Cart
        </Link>
      </div>

      {/* Optional Note */}
      <p className="text-gray-400 mt-6 text-sm">
        If you typed the URL manually, double-check the spelling.
      </p>
    </div>
  );
}

export default NotFound;
