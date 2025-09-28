import React from "react";
import { Link } from "react-router-dom";

/**
 * ThankYou Component
 * -------------------
 * Displays a confirmation message after a successful purchase.
 * Shows different CTAs depending on whether the user is signed in.
 */
function ThankYou({ isUserSignedIn }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      {/* Celebration emoji */}
      <div className="text-7xl mb-6 select-none">💖🛍️</div>

      {/* Main message */}
      <p className="text-2xl font-semibold text-gray-800 mb-4">
        Thank you for your purchase!
      </p>

      {/* Subtext depending on user status */}
      <p className="text-gray-700 mb-8">
        {isUserSignedIn
          ? "Your order has been placed successfully."
          : "You checked out as a guest. Create an account next time to track your orders."}
      </p>

      {/* Action buttons */}
      {isUserSignedIn ? (
        <div className="flex gap-4">
          <Link
            to="/myaccount?tab=purchases"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            My Purchases
          </Link>
          <Link
            to="/"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            Shop More
          </Link>
        </div>
      ) : (
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Shop More
        </Link>
      )}
    </div>
  );
}

export default ThankYou;
