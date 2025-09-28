import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * SignUp Component
 * Handles user registration with validation and error messages.
 */
function SignUp({ signUp }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
  };

  const validate = () => {
    const newErrors = { email: "", password: "" };

    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password too short";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (validationErrors.email || validationErrors.password) {
      setErrors(validationErrors);
      return;
    }

    const success = signUp(form.email, form.password);
    if (!success) {
      setErrors((prev) => ({ ...prev, email: "Email already exists" }));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded mt-10">
      <div className="text-5xl mb-2">👤</div>
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 transition ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Input */}
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
                : "border-gray-300 focus:ring-blue-500"
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
          Sign Up
        </button>
      </form>

      {/* Redirect to SignIn */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/signin" className="text-blue-600 hover:text-blue-800 font-medium">
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
