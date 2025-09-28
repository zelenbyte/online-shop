import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";

/**
 * ProductDetail Page
 * Displays detailed information for a single product,
 * including stock status, shipping options, and add-to-cart functionality.
 */
function ProductDetail({ addToCart, cart = [] }) {
  const { id } = useParams(); 
  const product = products.find((p) => p.id === parseInt(id));

  const [shippingMethod, setShippingMethod] = useState("standard");

  if (!product)
    return (
      <p className="text-center mt-10 text-gray-600">
        Product not found.
      </p>
    );

  // Determine stock info
  const cartItem = cart.find((item) => item.id === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;
  const remainingStock = product.stock - inCartQty;
  const isOutOfStock = remainingStock <= 0;
  const lowStock = remainingStock === 1;

  // Shipping options text
  const shippingText = {
    standard: "Standard Shipping (3-5 days)",
    express: "Express Shipping (1-2 days)",
    overnight: "Overnight Shipping (Next day)"
  }[shippingMethod];

  // Wrap addToCart to include shipping method
  const handleAddToCart = () => {
    addToCart({ ...product, shippingMethod });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-6">
        
        {/* Product Image */}
        <div className="w-full h-80 md:h-96 overflow-hidden rounded-lg">
          <img
            src={product.image || "/images/products/placeholder.jpg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-extrabold text-blue-600 mb-3">
            ${product.price}
          </p>

          {/* Stock Info */}
          <p className="text-sm text-gray-600 mb-1">
            In Stock:{" "}
            <span className={remainingStock <= 0 ? "text-red-500" : ""}>
              {remainingStock}
            </span>
          </p>
          {lowStock && !isOutOfStock && (
            <p className="text-orange-500 font-bold mb-2">Low stock!</p>
          )}

          {/* Shipping Method Selector */}
          <div className="mt-4 w-full text-left">
            <label className="block text-gray-700 font-semibold mb-1">
              Select Shipping Method:
            </label>
            <select
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="standard">Standard Shipping (3-5 days)</option>
              <option value="express">Express Shipping (1-2 days)</option>
              <option value="overnight">Overnight Shipping (Next day)</option>
            </select>
            <p className="mt-2 text-gray-600 italic">
              Selected: {shippingText}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`mt-3 w-full py-3 rounded-lg text-white font-bold transition duration-200 ${
              isOutOfStock
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>

          {/* Product Description */}
          <p className="mt-5 text-gray-700 text-left space-y-3">
            This premium {product.name} is crafted with the finest materials to
            ensure durability, comfort, and style. Designed for everyday use,
            it blends functionality with a modern aesthetic. Ideal for
            casual wear or special occasions, it offers unmatched quality and
            attention to detail. <br /><br />
            Featuring a contemporary design and versatile fit, this product is
            perfect for individuals who value both style and practicality.
            The thoughtful construction ensures longevity while maintaining a
            sleek appearance. <br /><br />
            Experience superior comfort and elegance with this {product.name}.
            Add it to your wardrobe today and enjoy a product that combines
            trendiness with timeless design.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
