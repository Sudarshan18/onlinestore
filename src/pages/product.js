import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { useCart } from '../contexts/CartContext';

const ProductDetails = () => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const fetchProductDetails = async (productId) => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const productData = await res.json();
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setProduct(null);
    }
  };

  if (!product) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-4 text-center">Product Details</h1>
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/2 h-96 object-cover rounded"
          />

          <div className="w-full md:w-1/2 mt-4 md:mt-0 bg-gray-200 p-4 rounded">
            <h3 className="text-xl font-semibold text-3xl">{product.title}</h3>
            <p className="text-red-500 text-2xl">${product.price}</p>
            <p>{product.description}</p>

            <div className="mt-4 flex justify-end">
              <button className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Buy
              </button>
              <button onClick={() => addToCart(product)} className="ml-4 mt-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
