import React, { useState } from "react";
import { CartItem, useCart } from "../../../sections/CartContext";

interface ProductDetailProps {
  product: any; // Adjust as needed
  id_product: string;
  file_product: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  id_product,
  file_product,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    console.log(file_product);
    if (product) {
      const cartItem: CartItem = {
        price: (product.sale_price
          ? product.sale_price
          : product.price
        ).toString(),
        name: product.name,
        imgSrc: file_product,
        quantity: 1,
        product_id: id_product,
      };
      console.log(cartItem);
      addToCart(cartItem);
      setIsAdded(true);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col">
          <img
            src={file_product}
            alt={product.name}
            className="w-full h-[650px] mb-5 object-cover object-center"
          />
        </div>

        <div>
          <h1 className="text-main font-semibold text-3xl font-montserrat mb-4">
            {product.name}
          </h1>
          <p className="text-black font-montserrat font-normal text-lg mb-4">
            {product.description}
          </p>

          <h2 className="text-main font-semibold text-xl font-montserrat mb-2">
            Состав
          </h2>
          <p className="text-black font-montserrat text-sm mb-4">
            {product.structure}
          </p>

          <h2 className="text-main font-semibold text-xl font-montserrat mb-2">
            Способ применения
          </h2>
          <p className="text-black font-montserrat text-sm mb-4">
            {product.application}
          </p>

          {/* Price Section */}
          {product.sale_price ? (
            <div className="text-right">
              <p className="text-red-500 font-montserrat font-semibold text-sm line-through">
                {product.price} ₽
              </p>
              <p className="text-black font-montserrat font-semibold text-lg">
                {product.sale_price} ₽
              </p>
            </div>
          ) : (
            <p className="text-black text-right font-montserrat font-semibold text-lg mb-4">
              {product.price} ₽
            </p>
          )}

          <button
            className={`bg-main text-white px-6 py-2 rounded hover:bg-main-dark transition duration-300 ${
              isAdded ? "bg-green-500" : ""
            }`}
            onClick={handleAddToCart}
            disabled={isAdded}
          >
            {isAdded ? "Добавлено в корзину" : "Добавить в корзину"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
