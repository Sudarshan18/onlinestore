// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Calculate the total number of items in the cart
  const cartItemCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, cartItemCount, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
