import { useState, useEffect } from "react";

/**
 * Custom hook for managing checkout state and logic.
 *
 * @param {Object} user - The currently logged-in user (null if guest)
 * @param {Array} cart - Current shopping cart items
 * @returns {Object} - Checkout state and handlers
 */
export function useCheckout(user, cart) {
  // State to track if checkout has been completed
  const [purchased, setPurchased] = useState(false);

  // Form state for billing/shipping/payment info
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    password: "",
    paymentMethod: "",
  });

  // State to track validation errors
  const [errors, setErrors] = useState({});

  // State for guest vs account creation option
  const [accountOption, setAccountOption] = useState("");

  // Toggle for showing/hiding password field
  const [showPassword, setShowPassword] = useState(false);

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        zip: user.zip || "",
        country: user.country || "",
      }));
    }
  }, [user]);

  /**
   * Handle form field changes
   * @param {Event} e - Change event from input
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  // Calculate total cart price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Determine if user is signed in
  const isUserSignedIn = !!user;

  // Disable checkout if user is guest and hasn't selected account option
  const isDisabled = !isUserSignedIn && !accountOption;

  return {
    form,
    setForm,
    errors,
    setErrors,
    accountOption,
    setAccountOption,
    showPassword,
    setShowPassword,
    purchased,
    setPurchased,
    handleChange,
    total,
    isDisabled,
    isUserSignedIn,
  };
}
