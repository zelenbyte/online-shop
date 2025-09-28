import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import MyAccount from "./pages/MyAccount";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // ----------------------
  // State
  // ----------------------
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ----------------------
  // Persist cart and user
  // ----------------------
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // ----------------------
  // Cart handlers
  // ----------------------
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    if (location.pathname !== "/cart") setIsSidebarOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // ----------------------
  // Authentication handlers
  // ----------------------
  const signIn = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (existingUser) {
      setUser(existingUser);
      navigate("/myaccount");
      return true;
    }
    return false;
  };

  const signUp = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) return false;

    const newUser = {
      email,
      password,
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      paymentInfo: [],
      purchases: [],
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(newUser);
    navigate("/myaccount");
    return true;
  };

  const signOut = () => {
    setUser(null);
    setTimeout(() => navigate("/signin"), 0);
  };

  // ----------------------
  // Render
  // ----------------------
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 relative">
      <Navbar
        cart={cart}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        user={user}
        signOut={signOut}
      />

      <CartSidebar
        cart={cart}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        removeItem={removeItem}
      />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} cart={cart} />} />

          <Route
            path="/myaccount"
            element={
              <ProtectedRoute user={user}>
                <MyAccount user={user} setUser={setUser} signOut={signOut} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signin"
            element={
              <PublicRoute user={user}>
                <SignIn signIn={signIn} />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute user={user}>
                <SignUp signUp={signUp} />
              </PublicRoute>
            }
          />

          <Route
            path="/product/:id"
            element={<ProductDetail addToCart={addToCart} cart={cart} />}
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                removeItem={removeItem}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout cart={cart} clearCart={clearCart} user={user} setUser={setUser} />
            }
          />

          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default AppWrapper;
