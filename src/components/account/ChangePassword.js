import React, { useState } from "react";

function ChangePassword({ user, setUser }) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Update form fields and clear individual field errors
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate input fields before submitting
  const validate = () => {
    const newErrors = {};

    if (!form.currentPassword) {
      newErrors.currentPassword = "Current password is required.";
    } else if (form.currentPassword !== user.password) {
      newErrors.currentPassword = "Current password is incorrect.";
    }

    if (!form.newPassword) {
      newErrors.newPassword = "New password is required.";
    } else if (form.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters.";
    }

    if (form.confirmPassword !== form.newPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  // Save the new password in localStorage and update parent state
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Update password inside the stored users list
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, password: form.newPassword } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Update the current user
    const updatedUser = { ...user, password: form.newPassword };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    // Show success feedback and reset the form
    setSuccess(true);
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Success message */}
      {success && (
        <p className="text-green-600 font-semibold">
          ✅ Your password has been updated successfully!
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.currentPassword
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
          )}
        </div>

        {/* New Password Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.newPassword
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-semibold"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
