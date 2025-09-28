export const validateForm = (form, accountOption) => {
  const newErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Personal Info Validation
  if (!form.firstName.trim()) newErrors.firstName = "First name is required";
  if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
  if (!form.email.trim()) newErrors.email = "Email is required";
  else if (!emailRegex.test(form.email)) newErrors.email = "Invalid email";
  if (form.phone && isNaN(form.phone)) newErrors.phone = "Phone must be numeric";

  // Address Validation
  if (!form.address.trim()) newErrors.address = "Address is required";
  if (!form.city.trim()) newErrors.city = "City is required";
  if (!form.zip.trim()) newErrors.zip = "ZIP is required";
  if (!form.country.trim()) newErrors.country = "Country is required";

  // Payment Method Validation
  if (!form.paymentMethod) {
    newErrors.paymentMethod = "Please select a payment method";
  }

  // Credit Card Specific Validation
  if (form.paymentMethod === "creditCard") {
    if (!form.cardHolder?.trim()) newErrors.cardHolder = "Card Holder Name is required";

    if (!form.cardNumber?.trim()) newErrors.cardNumber = "Card Number is required";
    else if (!/^\d{16}$/.test(form.cardNumber.replace(/\s+/g, "")))
      newErrors.cardNumber = "Card Number must be 16 digits";

    if (!form.expiryDate?.trim()) newErrors.expiryDate = "Expiry Date is required";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiryDate))
      newErrors.expiryDate = "Expiry Date must be in MM/YY format";

    if (!form.cvv?.trim()) newErrors.cvv = "CVV is required";
    else if (!/^\d{3,4}$/.test(form.cvv)) newErrors.cvv = "CVV must be 3 or 4 digits";
  }

  // Account creation validation
  if (accountOption === "create") {
    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
  }

  return newErrors;
};
