import React, { useState } from "react";
import { products } from "../data/products";
import { Link } from "react-router-dom";

/**
 * Home page component
 * Displays top banner and a grid of products with "Add to Cart" functionality.
 */
function Home({ addToCart, cart }) {
  const [visibleCount, setVisibleCount] = useState(12);

  // Load more products by increasing visible count
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-10 px-4 shadow-md">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">
          Big Autumn Sale 🍂
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          Get the best deals on our hottest products – limited stock!
        </p>
        <a
          href="#products"
          className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
        >
          Shop Now
        </a>
      </div>

      {/* Product Section */}
      <div id="products" className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
          Featured Products
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, visibleCount).map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);
            const inCartQty = cartItem ? cartItem.quantity : 0;
            const remainingStock = product.stock - inCartQty;
            const isOutOfStock = remainingStock <= 0;
            const lowStock = remainingStock === 1;

            return (
              <div
                key={product.id}
                className="bg-white border rounded-lg shadow-md p-4 flex flex-col justify-between"
              >
                {/* Product image and name */}
                <Link to={`/product/${product.id}`} className="mb-4">
                  <div className="w-full h-40 rounded mb-4 overflow-hidden flex items-center justify-center bg-gray-200">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>

                  {/* Price */}
                  <p className="text-2xl font-bold text-blue-600 mb-1">
                    ${product.price}
                  </p>
                </Link>

                {/* Stock info */}
                <p className="text-xs text-gray-600 mb-2">
                  In Stock:{" "}
                  <span className={isOutOfStock ? "text-red-500" : ""}>
                    {remainingStock}
                  </span>
                </p>

                {lowStock && !isOutOfStock && (
                  <p className="text-orange-500 font-bold text-sm mb-2">
                    Low stock!
                  </p>
                )}

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product)}
                  disabled={isOutOfStock}
                  className={`mt-2 py-2 px-4 rounded text-white font-semibold transition duration-200 ${
                    isOutOfStock
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                  }`}
                >
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < products.length && (
          <div className="text-center mt-10">
            <button
              onClick={handleLoadMore}
              className="mt-8 mx-auto block bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-semibold px-6 py-3 rounded-full shadow transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
