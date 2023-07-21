import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import Navbar from '../components/Navbar';
import { useCart } from '../contexts/CartContext';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const { data: searchResults, isLoading, isError } = useQuery(
    ['search', searchQuery],
    () => fetchSearchResults(searchQuery),
    {
      enabled: searchQuery.trim() !== '',
    }
  );

  const fetchSearchResults = async (query) => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products`);
      const products = await res.json();
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(query.trim().toLowerCase())
      );
      return filteredProducts;
    } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      setErrorMessage('Please enter a search term.');
    } else {
      setErrorMessage('');
    }
  };

  const { addToCart } = useCart();

  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-4 text-center">Search for Products</h1>
        <form onSubmit={handleFormSubmit} className="mb-4">
          <div className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for a product..."
              className="flex-1 rounded-l-lg py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-2 rounded ml-2"
            >
              Search
            </button>
          </div>
        </form>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {isError && <p className="text-red-500 mb-4">Error fetching data</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {searchResults?.map((product) => (
            <Link key={product.id} href={`/product?productId=${product.id}`} as={`/product/${product.id}`}>
              <div className="max-w-sm mx-auto border rounded-lg p-4 shadow-md bg-white h-full">
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded" />
                <h3 className="text-xl font-semibold mt-2">{product.title}</h3>
                <p className="text-gray-600">${product.price}</p>
                <button onClick={() => addToCart(product)} className="mt-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
