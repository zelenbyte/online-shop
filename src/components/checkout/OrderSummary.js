import React from "react";

/**
 * OrderSummary Component
 * -----------------------
 * Displays a summary of the items in the cart, total cost,
 * and a dynamic purchase button styled according to the chosen payment method.
 */
function OrderSummary({ cart, total, handlePurchase, isDisabled, form }) {
  // Determine button style and label dynamically
  const getButtonStyle = () => {
    if (isDisabled) return "bg-blue-500 cursor-not-allowed";
    switch (form.paymentMethod) {
      case "creditCard":
        return "bg-blue-500 hover:bg-blue-600";
      case "paypal":
        return "bg-yellow-500 hover:bg-yellow-600 text-black";
      case "cash":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  const getButtonText = () => {
    switch (form.paymentMethod) {
      case "creditCard":
        return "💳 Pay with Credit Card";
      case "paypal":
        return "🅿️ Pay with PayPal";
      case "cash":
        return "💵 Confirm Cash on Delivery";
      default:
        return "Confirm Purchase";
    }
  };

  return (
    <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md md:self-start md:sticky md:top-5 order-1 md:order-2">
      {/* Header */}
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      {/* Cart Items */}
      <ul className="space-y-2 mb-4">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between border-b pb-2">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>${item.price * item.quantity}</span>
          </li>
        ))}
      </ul>

      {/* Total */}
      <div className="flex justify-between font-semibold text-lg mb-4">
        <span>Total:</span>
        <span>${total}</span>
      </div>

      {/* Purchase Button */}
      <button
        onClick={handlePurchase}
        disabled={isDisabled}
        className={`w-full py-3 font-bold rounded transition text-white ${getButtonStyle()}`}
      >
        {getButtonText()}
      </button>
    </div>
  );
}

export default OrderSummary;
