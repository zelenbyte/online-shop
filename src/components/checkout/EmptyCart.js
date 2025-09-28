import React from "react";
import { Link } from "react-router-dom";

/**
 * EmptyCart Component
 * --------------------
 * Displays a friendly placeholder when the user's cart is empty,
 * encouraging them to return to the shop.
 */
function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      {/* Cart emoji icon */}
      <div className="text-8xl mb-6 select-none">🛒</div>

      {/* Heading & message */}
      <p className="text-2xl font-semibold text-gray-800 mb-4">
        Your cart is empty
      </p>
      <p className="text-gray-600 mb-6">
        Add products to your cart before proceeding to checkout.
      </p>

      {/* CTA button to return to shopping */}
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
      >
        Go Shopping
      </Link>
    </div>
  );
}

export default EmptyCart;
