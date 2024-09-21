import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useCart } from '../../../sections/CartContext';
import { Product, RegularProduct, PromotionalProduct } from '../../../constants'; // Adjust import path as needed

interface CartItem {
  imgSrc: string;
  imgSrcList: string[];
  description: string;
  name: string;
  category: string;
  fullDescription: string;
  composition: string;
  application: string;
  isNew: boolean;
  price: string; // Ensure CartItem includes price
  quantity: number;
}

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product) {
      // Determine if the product is a RegularProduct or PromotionalProduct
      let cartItem: CartItem;
      if ('price' in product) {
        // It's a RegularProduct
        cartItem = { ...product, price: product.price, quantity: 1 };
      } else {
        // It's a PromotionalProduct
        cartItem = { ...product, price: product.newPrice, quantity: 1 }; // Use newPrice for cart
      }
      addToCart(cartItem);
      setIsAdded(true);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="container mx-auto p-5">
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col">
          <Slider {...sliderSettings}>
            {product.imgSrcList.map((src, index) => (
              <div key={index}>
                <img 
                  src={src} 
                  alt={product.name} 
                  className="w-full h-auto mb-5" 
                />
              </div>
            ))}
          </Slider>
        </div>

        <div>
          <h1 className="text-main font-semibold text-3xl font-montserrat mb-4">
            {product.name}
          </h1>
          <p className="text-black font-montserrat font-normal text-lg mb-4">
            {product.fullDescription}
          </p>
          
          <h2 className="text-main font-semibold text-xl font-montserrat mb-2">
            Состав
          </h2>
          <p className="text-black font-montserrat text-sm mb-4">
            {product.composition}
          </p>

          <h2 className="text-main font-semibold text-xl font-montserrat mb-2">
            Способ применения
          </h2>
          <p className="text-black font-montserrat text-sm mb-4">
            {product.application}
          </p>

          {/* Display price depending on product type */}
          {'price' in product ? (
            <p className="text-black text-right font-montserrat font-semibold text-lg mb-4">
              {product.price}
            </p>
          ) : (
            <div className="text-right">
              <p className="text-red-500 font-montserrat font-semibold text-sm line-through">
                {product.oldPrice}
              </p>
              <p className="text-black font-montserrat font-semibold text-lg">
                {product.newPrice}
              </p>
            </div>
          )}

          <button 
            className={`bg-main text-white px-6 py-2 rounded hover:bg-main-dark transition duration-300 ${isAdded ? 'bg-green-500' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdded}
          >
            {isAdded ? 'Добавлено в корзину' : 'Добавить в корзину'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
