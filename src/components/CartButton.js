import React from 'react';
import { useCart } from '../contexts/CartContext';

const CartButton = () => {
  const { cart } = useCart();

  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Cart ({cart.length})
    </button>
  );
};

export default CartButton;
