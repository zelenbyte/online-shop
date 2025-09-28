import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

/**
 * SignIn Component
 * Handles user authentication with validation,
 * shows messages from protected route redirects,
 * and redirects after successful login.
 */
function SignIn({ signIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Optional message and redirect target from ProtectedRoute
  const message = location.state?.message;
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    const newErrors = { email: "", password: "", general: "" };
    let valid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    // Attempt to sign in
    const success = signIn(form.email, form.password);
    if (success) {
      navigate(from, { replace: true }); // redirect after login
    } else {
      setErrors((prev) => ({ ...prev, general: "Invalid email or password." }));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded mt-10">
      <div className="text-5xl mb-2">🔒</div>
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>

      {/* Show ProtectedRoute message or general errors */}
      {message && <p className="text-red-500 mb-2">{message}</p>}
      {errors.general && <p className="text-red-500 mb-2">{errors.general}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <input
            type="text" // bypass browser validation
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 transition ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500 border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={`w-full border px-3 py-2 pr-10 rounded focus:outline-none focus:ring-2 transition ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500 border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-0 right-0 bottom-0 px-2 flex items-center justify-center"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors duration-200"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default SignIn;
