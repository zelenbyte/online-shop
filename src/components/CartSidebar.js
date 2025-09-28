import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

function CartSidebar({ cart, isOpen, onClose, removeItem, addToCart, removeFromCart }) {
  const sidebarRef = useRef(null);
  const location = useLocation(); // Current route path

  // Compute totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
          <h2 className="text-xl font-bold">Your Cart ({totalItems})</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 font-bold">
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <div className="text-6xl mb-4 select-none">🛒</div>
              <p className="text-lg font-semibold mb-2">Your cart is empty</p>
              <p className="text-gray-600">Browse products and add items to your cart.</p>
            </div>
          ) : (
            cart.map((item) => {
              const remainingStock = item.stock - item.quantity;
              const isLowStock = remainingStock === 1;
              const isOutOfStock = item.quantity >= item.stock;

              return (
                <div key={item.id} className="flex justify-between items-center">
                  {/* Image + Name */}
                  <Link
                    to={`/product/${item.id}`}
                    className="flex items-center space-x-3 flex-1 hover:underline"
                  >
                    <img
                      src={item.image || "/images/products/placeholder.jpg"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        ${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      {isOutOfStock && (
                        <span className="text-red-500 text-xs font-bold">Out of stock</span>
                      )}
                      {!isOutOfStock && isLowStock && (
                        <span className="text-orange-500 text-xs font-bold">Low stock!</span>
                      )}
                    </div>
                  </Link>

                  {/* Quantity controls + remove */}
                  <div className="flex items-center ml-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300 transition"
                      title="Decrease quantity"
                    >
                      -
                    </button>

                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="w-12 text-center border-t border-b border-gray-200 py-1 text-sm"
                    />

                    <button
                      onClick={() => !isOutOfStock && addToCart(item)}
                      className={`px-3 py-1 bg-gray-200 rounded-r transition ${
                        isOutOfStock ? "cursor-not-allowed opacity-50" : "hover:bg-gray-300"
                      }`}
                      title="Increase quantity"
                      disabled={isOutOfStock}
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 font-bold ml-2"
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t flex flex-col space-y-2 flex-shrink-0">
            <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <Link
              to="/cart"
              className="bg-orange-500 text-white text-center py-2 rounded hover:bg-orange-600 transition font-semibold"
              onClick={onClose}
            >
              View Cart
            </Link>

            {/* Only show Checkout button if not already on /checkout */}
            {location.pathname !== "/checkout" && (
              <Link
                to="/checkout"
                className="bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition font-semibold"
                onClick={onClose}
              >
                Checkout
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;
