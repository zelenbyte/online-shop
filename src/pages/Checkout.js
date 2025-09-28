import React from "react";
import OrderSummary from "../components/checkout/OrderSummary";
import CheckoutForm from "../components/checkout/CheckoutForm";
import ThankYou from "../components/checkout/ThankYou";
import EmptyCart from "../components/checkout/EmptyCart";
import { handlePurchase } from "../utils/handlePurchase";
import { useCheckout } from "../hooks/useCheckout";

/**
 * Checkout page component
 * Handles displaying the checkout form, order summary, and post-purchase messages.
 *
 * @param {Array} cart - Current cart items
 * @param {Function} clearCart - Function to clear the cart
 * @param {Object} user - Current signed-in user (if any)
 * @param {Function} setUser - Function to update user state after account creation/purchase
 */
function Checkout({ cart, clearCart, user, setUser }) {
  // Use custom hook for checkout form state and logic
  const {
    form,
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
  } = useCheckout(user, cart);

  // Show thank-you page after purchase
  if (purchased) return <ThankYou isUserSignedIn={isUserSignedIn} />;

  // Show empty cart if there are no items
  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Checkout
      </h1>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Checkout Form */}
        <CheckoutForm
          isUserSignedIn={isUserSignedIn}
          accountOption={accountOption}
          setAccountOption={setAccountOption}
          form={form}
          handleChange={handleChange}
          isDisabled={isDisabled}
          errors={errors}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        {/* Order Summary */}
        <OrderSummary
          cart={cart}
          total={total}
          handlePurchase={() =>
            handlePurchase({
              form,
              accountOption,
              cart,
              total,
              user,
              setUser,
              setErrors,
              setPurchased,
              clearCart,
            })
          }
          isDisabled={isDisabled}
          form={form}
        />
      </div>
    </div>
  );
}

export default Checkout;
