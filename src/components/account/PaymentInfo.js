import React, { useState, useEffect } from "react";

function PaymentInfo({ user, setUser }) {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({
    cardType: "",
    number: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Load saved cards from the user object when component mounts or user updates
  useEffect(() => {
    if (user && user.paymentInfo) {
      setCards(user.paymentInfo);
    }
  }, [user]);

  // Generic field change handler (for card type and others)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Format and limit card number input
  const handleNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setNewCard((prev) => ({ ...prev, number: formatted }));
    setErrors((prev) => ({ ...prev, number: "" }));
  };

  // Format expiry as MM/YY
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    setNewCard((prev) => ({ ...prev, expiry: value }));
    setErrors((prev) => ({ ...prev, expiry: "" }));
  };

  // Limit CVC to max 4 digits
  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setNewCard((prev) => ({ ...prev, cvc: value }));
    setErrors((prev) => ({ ...prev, cvc: "" }));
  };

  // Validate form fields before saving a card
  const validate = () => {
    const newErrors = {};
    if (!newCard.cardType) newErrors.cardType = "Card type is required.";

    const digitsOnly = newCard.number.replace(/\s+/g, "");
    if (!digitsOnly) newErrors.number = "Card number is required.";
    else if (digitsOnly.length !== 16)
      newErrors.number = "Card number must be 16 digits.";

    if (!newCard.expiry.trim()) newErrors.expiry = "Expiry date is required.";
    if (!newCard.cvc.trim()) newErrors.cvc = "CVC is required.";
    return newErrors;
  };

  // Add a new card and persist changes
  const handleAddCard = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const cardEntry = {
      cardType: newCard.cardType,
      last4: newCard.number.slice(-4),
      expiry: newCard.expiry,
      number: newCard.number,
      cvc: newCard.cvc,
    };

    const updatedCards = [...cards, cardEntry];
    setCards(updatedCards);
    setNewCard({ cardType: "", number: "", expiry: "", cvc: "" });
    setSuccess(true);

    // Update user state and localStorage
    const updatedUser = { ...user, paymentInfo: updatedCards };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem(
      "users",
      JSON.stringify(
        JSON.parse(localStorage.getItem("users") || "[]").map((u) =>
          u.email === user.email ? updatedUser : u
        )
      )
    );
    setUser(updatedUser);

    // Hide success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  // Remove a saved card and persist changes
  const handleRemoveCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);

    const updatedUser = { ...user, paymentInfo: updatedCards };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem(
      "users",
      JSON.stringify(
        JSON.parse(localStorage.getItem("users") || "[]").map((u) =>
          u.email === user.email ? updatedUser : u
        )
      )
    );
    setUser(updatedUser);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Saved Payment Methods</h2>

      {/* Display saved cards or fallback if none */}
      {cards.length === 0 ? (
        <p>No payment methods saved.</p>
      ) : (
        <ul className="space-y-4">
          {cards.map((card, index) => (
            <li
              key={index}
              className="border rounded-lg p-4 shadow-sm flex flex-col justify-between"
            >
              <div>
                <p className="font-semibold">{card.cardType}</p>
                <p>**** **** **** {card.last4}</p>
                <p>Expiry: {card.expiry}</p>
              </div>
              <p
                className="text-red-500 text-sm mt-1 cursor-pointer"
                onClick={() => handleRemoveCard(index)}
              >
                Remove
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* Add new card form */}
      <h3 className="text-xl font-bold mt-6">Add New Card</h3>
      {success && (
        <p className="text-green-600 font-semibold">
          ✅ Card added successfully!
        </p>
      )}

      <form onSubmit={handleAddCard} className="space-y-4">
        {/* Card Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Type
          </label>
          <select
            name="cardType"
            value={newCard.cardType}
            onChange={handleChange}
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.cardType
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          >
            <option value="">-- Select Card Type --</option>
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
            <option value="American Express">American Express</option>
          </select>
          {errors.cardType && (
            <p className="text-red-500 text-sm mt-1">{errors.cardType}</p>
          )}
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Number
          </label>
          <input
            type="text"
            name="number"
            value={newCard.number}
            onChange={handleNumberChange}
            placeholder="1234 1234 1234 1234"
            maxLength={19}
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.number
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.number && (
            <p className="text-red-500 text-sm mt-1">{errors.number}</p>
          )}
        </div>

        {/* Expiry & CVC */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">
              Expiry
            </label>
            <input
              type="text"
              name="expiry"
              value={newCard.expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              maxLength={5}
              className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.expiry
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.expiry && (
              <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">CVC</label>
            <input
              type="text"
              name="cvc"
              value={newCard.cvc}
              onChange={handleCvcChange}
              placeholder="123"
              maxLength={4}
              className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.cvc
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.cvc && (
              <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-semibold"
        >
          Add Card
        </button>
      </form>
    </div>
  );
}

export default PaymentInfo;
