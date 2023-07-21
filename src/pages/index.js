import fetch from 'isomorphic-unfetch';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';
import Navbar from '../components/Navbar';

const fetchProducts = async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};


const Home = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    getProducts();
  }, []);

  return (
    
    <div className="bg-gray-100 min-h-screen py-8">
      <Navbar/>
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-4 text-center">Welcome to Our Online Store</h1>
        <div className="flex justify-end mb-4">
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
                <div className="border rounded-lg p-4 shadow-md bg-white">
                  <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded" />
                  <h3 className="text-xl font-semibold mt-2">{product.title}</h3>
                  <p className="text-gray-600">${product.price}</p>
                  <button onClick={() => addToCart(product)} className="mt-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </div>
    </div>
  );
};

export default Home;
