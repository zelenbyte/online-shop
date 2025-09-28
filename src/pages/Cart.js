import React from "react";
import { Link } from "react-router-dom";

/**
 * Cart component displays cart items, total price, and checkout actions.
 *
 * @param {Array} cart - Array of cart items
 * @param {Function} addToCart - Increase item quantity
 * @param {Function} removeFromCart - Decrease item quantity
 * @param {Function} removeItem - Remove item from cart
 * @param {Function} clearCart - Clear entire cart
 */
function Cart({ cart, addToCart, removeFromCart, removeItem, clearCart }) {
  // Calculate total cart price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Cart title */}
      {cart.length > 0 && (
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Your Cart
        </h1>
      )}

      {/* Empty cart message */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="text-8xl mb-6 select-none">🛒</div>
          <p className="text-2xl font-semibold text-gray-800 mb-4">
            Your cart is empty
          </p>
          <p className="text-gray-600 mb-6">
            Browse products and add items to your cart.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Go Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Cart items */}
          <ul className="space-y-4 w-full">
            {cart.map((item) => {
              const remainingStock = item.stock - item.quantity;
              const isMax = item.quantity >= item.stock;
              const isLowStock = remainingStock === 1;

              return (
                <li
                  key={item.id}
                  className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm bg-white"
                >
                  {/* Product image and info */}
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-4 flex-1">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.image || "/images/products/placeholder.jpg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded mb-2 md:mb-0"
                      />
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                      <Link
                        to={`/product/${item.id}`}
                        className="font-semibold text-lg hover:underline"
                      >
                        {item.name}
                      </Link>
                      <span className="text-gray-700">
                        ${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Stock warnings */}
                      {isMax && (
                        <span className="ml-0 md:ml-4 text-red-500 font-bold">
                          Out of stock
                        </span>
                      )}
                      {!isMax && isLowStock && (
                        <span className="ml-0 md:ml-4 text-orange-500 font-bold">
                          Low stock!
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="mt-2 md:mt-0 flex items-center">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300 transition"
                    >
                      -
                    </button>

                    <input
                      type="text"
                      readOnly
                      value={item.quantity}
                      className="w-10 text-center border-t border-b border-gray-200 py-1 text-sm"
                    />

                    <button
                      onClick={() => !isMax && addToCart(item)}
                      disabled={isMax}
                      className={`px-2 py-1 bg-gray-200 rounded-r transition ${
                        isMax ? "cursor-not-allowed opacity-50" : "hover:bg-gray-300"
                      }`}
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 font-bold ml-2 px-3"
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Total and action buttons */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 w-full">
            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>

            <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Clear Cart
              </button>

              <Link
                to="/checkout"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
