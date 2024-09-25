import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Banner } from "../../../assets";
import { getProducts } from "../../../api";

const NewsGoods = () => {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();

      const activeItems = response.filter(
        (item) => item.product.status === true
      );

      setProducts(activeItems);
    } catch (error) {
      console.error("Ошибка при получении продуктов:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="mx-10 mt-20 mb-20">
        <h1 className="text-main-text font-semibold text-3xl font-montserrat">
          Новинки
        </h1>
        <div className="grid grid-cols-5 mt-5 gap-16">
          {products.map((item, index) => (
            <Link
              key={index}
              to={`/product/Новинки/${encodeURIComponent(item.product.name)}`}
              className="text-left border border-[#D9D9D9] w-[300px] cursor-pointer hover:shadow-2xl"
            >
              <img
                src={`data:image/png;base64,${item.file}`}
                alt={item.product.name}
                className="w-[300px] h-72 object-cover"
              />
              <p className="text-black mt-4 font-montserrat font-normal text-sm px-3">
                {item.product.smallDescription}
              </p>
              <p className="text-black font-montserrat font-semibold text-sm mt-2 px-3">
                {item.product.name}
              </p>
              <p className="text-black text-right font-montserrat font-semibold text-lg mt-1 mb-2 px-3 ">
                {item.product.price} ₽
              </p>
            </Link>
          ))}
        </div>
        <div className="flex justify-end mt-5 mr-4">
          <button className="bg-white border-main border px-10 py-2 rounded-md hover:bg-slate-50 mt-4">
            <Link
              className="font-montserrat text-base font-bold text-main hover:text-light-main"
              to="/product/Новинки/"
            >
              Новинки
            </Link>
          </button>
        </div>
      </div>
      <Link className="w-full mb-14" to="/product/Акции/">
        <img src={Banner} alt="banner" />
      </Link>
    </div>
  );
};

export default NewsGoods;
