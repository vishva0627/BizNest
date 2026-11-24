import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("biznest_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeStoreSlug, setActiveStoreSlug] = useState(() => {
    try {
      return localStorage.getItem("biznest_cart_store") || null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("biznest_cart", JSON.stringify(cart));
      if (activeStoreSlug) {
        localStorage.setItem("biznest_cart_store", activeStoreSlug);
      }
    } catch (e) {
      console.warn("Cart storage sync failed:", e);
    }
  }, [cart, activeStoreSlug]);

  const addToCart = (product, quantity = 1, currentStoreSlug = null) => {
    // If adding from a different store, reset cart with confirmation or auto-switch
    if (currentStoreSlug && activeStoreSlug && activeStoreSlug !== currentStoreSlug) {
      if (cart.length > 0) {
        const confirmSwitch = window.confirm(
          "Your cart contains items from another business. Would you like to clear the cart to add items from this business?"
        );
        if (!confirmSwitch) return;
        setCart([{ ...product, quantity }]);
        setActiveStoreSlug(currentStoreSlug);
        setIsCartOpen(true);
        return;
      }
    }

    if (currentStoreSlug) {
      setActiveStoreSlug(currentStoreSlug);
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        activeStoreSlug
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
