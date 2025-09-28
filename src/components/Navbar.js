import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AccountSidebar from "./account/AccountSidebar";
import { products } from "../data/products";

function Navbar({ cart, onOpenSidebar, user, signOut }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const mobileMenuRef = useRef(null);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Custom NavLink component to highlight active page
  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return isActive ? (
      <span className="px-3 py-2 border-b-2 border-blue-600 text-gray-700">{children}</span>
    ) : (
      <Link
        to={to}
        className="px-3 py-2 text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-400 transition"
      >
        {children}
      </Link>
    );
  };

  const isCartPage = location.pathname === "/cart";

  // Handle live product search
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const results = products
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          const q = query.toLowerCase();
          if (nameA.startsWith(q) && !nameB.startsWith(q)) return -1;
          if (!nameA.startsWith(q) && nameB.startsWith(q)) return 1;
          return 0;
        });
      setSearchResults(results.slice(0, 10));
    } else {
      setSearchResults([]);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdowns on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-white shadow-md select-none">
      <div className="max-w-6xl mx-auto flex justify-between items-center h-16 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800">
          Online Shop
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 flex-1 mx-6">
          <NavLink to="/">Home</NavLink>

          {/* Product Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search products..."
              className="border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:border-blue-600"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 w-full max-h-64 overflow-auto">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded mr-2"
                    />
                    <span>{product.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Account & Cart (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={`px-3 py-2 text-gray-700 hover:text-blue-600 transition ${
                  location.pathname.startsWith("/myaccount") ? "border-b-2 border-blue-600" : ""
                }`}
              >
                My Account ▾
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-0 bg-white border border-gray-200 rounded shadow-lg z-20 min-w-[220px]">
                  <AccountSidebar
                    activeTab=""
                    setActiveTab={(tab) => {
                      navigate(`/myaccount?tab=${tab}`);
                      setDropdownOpen(false);
                    }}
                    signOut={() => {
                      signOut();
                      setDropdownOpen(false);
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/signin">My Account</NavLink>
          )}

          {/* Cart Button */}
          {isCartPage ? (
            <span className="px-3 py-2 border-b-2 border-blue-600 text-gray-700 relative cursor-default">
              Cart
              {totalItems > 0 && (
                <span className="ml-1 inline-block bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </span>
          ) : (
            <button
              type="button"
              onClick={onOpenSidebar}
              className="px-3 py-2 text-gray-700 hover:text-blue-600 transition relative"
            >
              Cart
              {totalItems > 0 && (
                <span className="ml-1 inline-block bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden px-6 pb-4 space-y-4">
          <NavLink to="/">Home</NavLink>

          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:border-blue-600"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 w-full max-h-64 overflow-auto">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      setSearchQuery("");
                      setSearchResults([]);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded mr-2"
                    />
                    <span>{product.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Account Dropdown */}
          {user ? (
            <div>
              <button
                className="px-3 py-2 text-gray-700 hover:text-blue-600 transition"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                My Account ▾
              </button>
              {dropdownOpen && (
                <div className="bg-white border border-gray-200 rounded shadow-lg z-20 p-2 space-y-2">
                  <AccountSidebar
                    activeTab=""
                    setActiveTab={(tab) => {
                      navigate(`/myaccount?tab=${tab}`);
                      setDropdownOpen(false);
                      setMobileMenuOpen(false);
                    }}
                    signOut={() => {
                      signOut();
                      setDropdownOpen(false);
                      setMobileMenuOpen(false);
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/signin">My Account</NavLink>
          )}

          {/* Mobile Cart Button */}
          <button
            type="button"
            onClick={onOpenSidebar}
            className="px-3 py-2 text-gray-700 hover:text-blue-600 transition relative"
          >
            Cart
            {totalItems > 0 && (
              <span className="ml-1 inline-block bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
