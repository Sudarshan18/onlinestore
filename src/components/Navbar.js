import React from 'react';
import Link from 'next/link';
import CartIcon from './CartIcon';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { cartItemCount } = useCart();

  return (
    <nav className="bg-yellow-700 py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="text-white text-xl font-bold">
          OnlineStore
        </Link>
      </div>
      <div className="flex items-center">
        <ul className="flex space-x-4 text-white">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/search">Search</Link>
          </li>
        </ul>
        <Link href="/cart" className="relative">
          <CartIcon />
          {cartItemCount > 0 && (
            <div className="absolute top-0 right-0 w-4 h-4 flex items-center justify-center text-xs text-white bg-red-500 rounded-full">
              {cartItemCount}
            </div>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
