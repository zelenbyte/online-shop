import React from "react";

function PurchaseInfo({ user }) {
  // Retrieve purchases from user object (fallback to empty array)
  const purchases = user?.purchases || [];

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">My Purchases</h2>

      {/* Show message if no purchases exist */}
      {purchases.length === 0 ? (
        <p>You have no past purchases.</p>
      ) : (
        <div className="space-y-4">
          {/* Reverse array so newest orders appear first */}
          {[...purchases].reverse().map((purchase, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm">
              {/* Order header with number and status */}
              <div className="flex justify-between mb-2">
                {/* Order number is calculated so the latest order is #1 */}
                <p className="font-semibold">
                  Order #{purchases.length - index}
                </p>
                <p
                  className={`font-medium ${
                    purchase.status === "Delivered"
                      ? "text-green-600"
                      : purchase.status === "Shipped"
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {purchase.status}
                </p>
              </div>

              {/* Purchase date */}
              <p className="text-gray-500 text-sm mb-2">Date: {purchase.date}</p>

              {/* List of purchased items */}
              <ul className="mb-2 space-y-3">
                {purchase.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center text-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      {/* Product thumbnail (if available) */}
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                    </div>
                    <span>${item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>

              {/* Total order cost */}
              <div className="text-right font-semibold">
                Total: ${purchase.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PurchaseInfo;
