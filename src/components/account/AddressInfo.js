import React, { useState, useEffect } from "react";

function AddressInfo({ user, setUser }) {
  const [addressData, setAddressData] = useState({
    address: "",
    city: "",
    zip: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Load existing user address when component mounts or user changes
  useEffect(() => {
    if (user) {
      setAddressData({
        address: user.address || "",
        city: user.city || "",
        zip: user.zip || "",
        country: user.country || "",
      });
    }
  }, [user]);

  // Update input values and clear individual field errors
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate required fields before saving
  const validate = () => {
    const newErrors = {};
    if (!addressData.address.trim()) newErrors.address = "Address is required.";
    if (!addressData.city.trim()) newErrors.city = "City is required.";
    if (!addressData.zip.trim()) newErrors.zip = "ZIP code is required.";
    if (!addressData.country.trim()) newErrors.country = "Country is required.";
    return newErrors;
  };

  // Save address to localStorage and update parent user state
  const handleSave = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Update address in stored users list
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, ...addressData } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Update current user and inform parent component
    const updatedUser = { ...user, ...addressData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    // Show temporary success message
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Address Information</h2>

      {/* Success message */}
      {success && (
        <p className="text-green-600 font-semibold">
          ✅ Address saved successfully!
        </p>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        {/* Address Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={addressData.address}
            onChange={handleChange}
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.address
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* City Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">City</label>
          <input
            type="text"
            name="city"
            value={addressData.city}
            onChange={handleChange}
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.city
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        {/* ZIP Code Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">ZIP Code</label>
          <input
            type="text"
            name="zip"
            value={addressData.zip}
            onChange={handleChange}
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.zip
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.zip && (
            <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
          )}
        </div>

        {/* Country Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={addressData.country}
            onChange={handleChange}
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.country
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-semibold"
        >
          Save Address
        </button>
      </form>
    </div>
  );
}

export default AddressInfo;
