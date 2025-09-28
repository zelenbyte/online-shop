import { validateForm } from "./validateForm";

export const handlePurchase = ({
  form,
  accountOption,
  cart,
  total,
  user,
  setUser,
  setErrors,
  setPurchased,
  clearCart,
}) => {
  // Validate checkout form
  const validationErrors = validateForm(form, accountOption);
  if (Object.keys(validationErrors).length) {
    setErrors(validationErrors);
    return;
  }

  let currentUser;

  // Handle account creation
  if (!user && accountOption === "create") {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find((u) => u.email === form.email);
    if (existingUser) {
      setErrors({ email: "User with this email already exists!" });
      return;
    }
    const newUser = { ...form, purchases: [] };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(newUser));
    currentUser = newUser;
    setUser(newUser);

  // Handle guest checkout
  } else if (!user && accountOption === "guest") {
    currentUser = { ...form, purchases: [] };

  // Logged-in user
  } else {
    currentUser = user;
  }

  // Create purchase record
  const purchase = {
    date: new Date().toLocaleDateString("en-GB"),
    items: cart.map(({ id, ...item }) => item), // exclude internal id
    total,
    status: ["Shipped", "Processing", "Delivered"][Math.floor(Math.random() * 3)],
  };

  // Update user data for account-created or logged-in users
  if (accountOption === "create" || user) {
    const updatedUser = {
      ...currentUser,
      ...(accountOption === "create" ? { password: form.password } : {}),
      ...form,
      purchases: [...(currentUser.purchases || []), purchase],
    };

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  }

  // Finalize checkout
  setPurchased(true);
  clearCart();
};
