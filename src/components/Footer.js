import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center space-y-2">
        
        {/* Links */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 text-center">
          <a
            href="/privacy-policy"
            className="hover:text-gray-400 transition"
          >
            Privacy Policy
          </a>

          <a
            href="/terms-of-service"
            className="hover:text-gray-400 transition"
          >
            Terms of Service
          </a>

          <Link
            to="/contact"
            className="hover:text-gray-400 transition"
          >
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-center mt-2">
          &copy; {new Date().getFullYear()} My Online Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
