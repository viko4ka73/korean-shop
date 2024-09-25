import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Body, Face, Hair, Ton, Toner } from "../../../assets";
import { getProducts } from "../../../api";

const categoryImages: { [key: string]: string } = {
  "Уход за лицом": Face,
  Тело: Body,
  Волосы: Hair,
  Тонеры: Toner,
  Косметика: Ton,
};

const Goods = () => {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();

      const uniqueCategories = Array.from(
        new Map(response.map((item) => [item.product.type, item])).values()
      );

      console.log("Уникальные категории:", uniqueCategories);
      setProducts(uniqueCategories);
    } catch (error) {
      console.error("Ошибка при получении продуктов:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mx-10 mt-5">
      <h1 className="text-main-text font-semibold text-3xl font-montserrat">
        Товары
      </h1>
      <div className="grid grid-cols-5 mt-8 gap-40">
        {products.map((product, index) => (
          <Link
            key={index}
            className="text-center"
            to={`/product/${product.product.type}`}
          >
            <img
              src={
                categoryImages[product.product.type] ||
                categoryImages["default"]
              }
              alt={product.product.name}
              className="h-[250px] w-[300px] object-contain cursor-pointer hover:scale-105"
            />
            <p className="text-main-light-gray mt-3 font-montserrat text-base">
              {product.product.type}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Goods;
