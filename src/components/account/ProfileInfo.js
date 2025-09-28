import React, { useState, useEffect } from "react";

function ProfileInfo({ user, setUser }) {
  // Local state for the editable profile form
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Track field validation errors and success feedback
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Load current user info into the form when the component mounts or user changes
  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Update form state on input change and clear any existing error for that field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate the form fields before saving
  const validate = () => {
    const newErrors = {};
    if (!profile.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!profile.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!profile.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(profile.email)) {
      newErrors.email = "Invalid email address.";
    }
    // Phone is optional but must be numeric if provided
    if (profile.phone.trim() && !/^[0-9]+$/.test(profile.phone.trim())) {
      newErrors.phone = "Phone must contain only numbers.";
    }
    return newErrors;
  };

  // Save changes to localStorage and parent state
  const handleSave = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Update the users array in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, ...profile } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Update the current user in localStorage and parent state
    const updatedUser = { ...user, ...profile };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    // Show success message temporarily
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Profile Information</h2>

      {success && (
        <p className="text-green-600 font-semibold">
          ✅ Profile updated successfully!
        </p>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.firstName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.lastName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="text"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone (Optional) */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Phone <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Numbers only"
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.phone
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-semibold"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ProfileInfo;
