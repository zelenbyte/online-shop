import React from "react";

function CheckoutForm({
  isUserSignedIn,
  accountOption,
  setAccountOption,
  form,
  handleChange,
  isDisabled,
  errors,
  showPassword,
  setShowPassword,
}) {
  return (
    <div className="w-full md:w-2/3 p-6 order-2 md:order-1">
      <h2 className="text-xl font-bold mb-6">
        Billing & Shipping Information
      </h2>

      {/* --- Account Options (Guest vs Create) --- */}
      {!isUserSignedIn && (
        <div className="flex space-x-3 mb-6">
          {["guest", "create"].map((option) => (
            <label
              key={option}
              className={`
                px-4 py-2 rounded-lg cursor-pointer font-semibold text-sm
                border transition
                ${
                  accountOption === option
                    ? "bg-blue-200 text-blue-600 border-blue-400"
                    : "text-blue-400 border-blue-200 hover:bg-blue-200 hover:text-blue-500"
                }
              `}
            >
              <input
                type="radio"
                name="accountOption"
                value={option}
                checked={accountOption === option}
                onChange={() => setAccountOption(option)}
                className="hidden"
              />
              {option === "guest" ? "Continue as Guest" : "Create an Account"}
            </label>
          ))}
        </div>
      )}

      {/* --- Checkout Form --- */}
      <form className="space-y-6 min-h-screen">
        {/* First / Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["firstName", "lastName"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-2">
                {field === "firstName" ? "First Name" : "Last Name"}
              </label>
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                disabled={isDisabled}
                className={`w-full border rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 mb-1 ${
                  errors[field]
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              {errors[field] && (
                <p className="text-red-500 text-sm">{errors[field]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={isDisabled}
              className={`w-full border rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 mb-1 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Phone <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={isDisabled}
              className={`w-full border rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 mb-1 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Password (only if creating account) + Address */}
        {accountOption === "create" && !isUserSignedIn ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password with toggle visibility */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full border rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 pr-10 mb-1 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-0 right-0 bottom-0 px-2 mb-1 flex items-center justify-center"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Address */}
            <AddressField
              value={form.address}
              onChange={handleChange}
              disabled={isDisabled}
              error={errors.address}
            />
          </div>
        ) : (
          <AddressField
            value={form.address}
            onChange={handleChange}
            disabled={isDisabled}
            error={errors.address}
          />
        )}

        {/* City, Zip, Country */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["city", "zip", "country"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-2">
                {field === "zip" ? "ZIP / Postal Code" : field[0].toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                disabled={isDisabled}
                className={`w-full border rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 mb-1 ${
                  errors[field]
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              {errors[field] && (
                <p className="text-red-500 text-sm">{errors[field]}</p>
              )}
            </div>
          ))}
        </div>

        {/* --- Payment Section --- */}
        <div>
          <p className="block text-sm font-medium mb-2">Payment Method</p>
          <div className="space-y-2">
            {["creditCard", "paypal", "cash"].map((method) => (
              <label key={method} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={form.paymentMethod === method}
                  onChange={handleChange}
                  disabled={isDisabled}
                  className="accent-blue-500"
                />
                <span className={`text-lg ${isDisabled ? "text-gray-300" : ""}`}>
                  {method === "creditCard"
                    ? "Credit Card"
                    : method === "paypal"
                    ? "PayPal"
                    : "Cash on Delivery"}
                </span>
              </label>
            ))}
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
            )}
          </div>

          {/* Credit Card fields shown only when selected */}
          {form.paymentMethod === "creditCard" && (
            <div className="space-y-4 pt-5 transition-all duration-500 ease-in-out">
              {["cardHolder", "cardNumber"].map((field) => (
                <TextField
                  key={field}
                  name={field}
                  label={field === "cardHolder" ? "Card Holder Name" : "Card Number"}
                  placeholder={
                    field === "cardHolder" ? "Full Name" : "1234 5678 9012 3456"
                  }
                  value={form[field] || ""}
                  onChange={handleChange}
                  error={errors[field]}
                />
              ))}

              <div className="grid grid-cols-2 gap-4">
                {["expiryDate", "cvv"].map((field) => (
                  <TextField
                    key={field}
                    name={field}
                    label={field === "expiryDate" ? "Expiry Date" : "CVV"}
                    placeholder={field === "expiryDate" ? "MM/YY" : "123"}
                    value={form[field] || ""}
                    onChange={handleChange}
                    error={errors[field]}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

/* --- Small Reusable Subcomponents for readability --- */
function AddressField({ value, onChange, disabled, error }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Address</label>
      <input
        type="text"
        name="address"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full border rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 mb-1 ${
          error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

function TextField({ name, label, placeholder, value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 mb-1 ${
          error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default CheckoutForm;
