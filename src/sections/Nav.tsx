import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../assets";
import { navLinks } from "../constants";
import { useCart } from "./CartContext";
import { getProducts } from "../api"; // Import the existing getProducts function

const Nav = () => {
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]); // To hold filtered products
  const [allProducts, setAllProducts] = useState<any[]>([]); // To hold all products
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all products when the component mounts
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        const products = await getProducts(); // Fetch all products
        setAllProducts(products); // Store all products
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery) {
      const results = allProducts.filter((product) =>
        product.product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]); // Clear results when the search query is empty
    }
  }, [searchQuery, allProducts]);

  return (
    <section className="bg-main-gray w-full py-2 px-10">
      <div className="flex gap-32 items-center">
        <a href="/">
          <img src={Logo} alt="Logo" />
        </a>
        <ul className="flex justify-center items-center gap-40">
          {navLinks.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="font-montserrat text-xl font-bold text-main hover:text-light-main"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <form className="w-full max-w-sm">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-main left-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 text-main-light-gray border border-white rounded-lg py-2 px-2 outline-none bg-gray-50 focus:bg-white focus:border-light-main"
              placeholder="Поиск"
            />
            {isLoading && (
              <div className="absolute left-3 top-2 text-gray-500">
                Loading...
              </div>
            )}
            {searchResults.length > 0 && (
              <div className="absolute bg-white border border-gray-200 w-full mt-1 rounded-lg shadow-lg z-10">
                {searchResults.map((product, index) => {
                  const category = product.product.type;

                  return (
                    <Link
                      key={index}
                      to={`/product/${encodeURIComponent(
                        category
                      )}/${encodeURIComponent(product.product.name)}`}
                      className="block px-4 py-2 text-main hover:bg-gray-100"
                      onClick={() => setSearchQuery("")}
                    >
                      {product.product.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </form>
        <div className="relative">
          <Link
            to="/cart"
            className="bg-white px-10 py-2 rounded-md hover:bg-slate-50 flex items-center"
          >
            <span className="font-montserrat text-xl font-bold text-main hover:text-light-main">
              Корзина
            </span>
          </Link>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-main text-white rounded-full px-2 py-1 text-xs">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default Nav;
