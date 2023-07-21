import React from 'react';
import { useCart } from '../contexts/CartContext';

const CartIcon = () => {
  const { cartItemCount } = useCart();

  return (
    <div className="relative w-10 h-10">
      {/* Replace the following SVG code with your desired cart icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6 mx-auto"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L2 6h16l-4 12H6z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18V9a2 2 0 012-2h8a2 2 0 012 2v9m-4 4v3a2 2 0 01-2 2 2 2 0 01-2-2v-3"
        />
      </svg>
      {/* Display the cart item count */}
      {cartItemCount > 0 && (
        <div className="absolute top-0 right-0 w-4 h-4 flex items-center justify-center text-xs text-white bg-red-500 rounded-full">
          {cartItemCount}
        </div>
      )}
    </div>
  );
};

export default CartIcon;