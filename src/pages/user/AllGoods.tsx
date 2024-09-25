import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoriesMenu from "../../components/user/products/CategoriesMenu";
import Breadcrumbs from "../../components/user/products/Breadcrumbs";
import { getProducts } from "../../api"; // Import the getProducts function
import { ProductDetail } from "../../components/user/products";

const AllGoods = () => {
  const { category, productName } = useParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [displayedGoods, setDisplayedGoods] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();

        const processedProducts = products.map((item) => {
          if (item.file) {
            return {
              ...item,
              file: `data:image/png;base64,${item.file}`,
            };
          }
          return item;
        });

        setAllProducts(processedProducts);
        setDisplayedGoods(processedProducts);
        console.log(selectedProduct.file);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let decodedProductName: string | null;

    try {
      decodedProductName = productName ? decodeURIComponent(productName) : null;
    } catch (error) {
      console.error("Failed to decode product name:", error);
      decodedProductName = null;
    }

    if (category && !decodedProductName) {
      if (category === "Новинки") {
        setSelectedCategory(category);
        setDisplayedGoods(
          allProducts.filter((item) => item.product.status === true)
        );
        setBreadcrumbs(["Новинки"]);
      } else if (category === "Акции") {
        setSelectedCategory(category);
        setDisplayedGoods(
          allProducts.filter((item) => item.product.is_on_sale)
        );
        setBreadcrumbs(["Акции"]);
      } else {
        setSelectedCategory(category);
        setDisplayedGoods(
          allProducts.filter((item) => item.product.type === category)
        );
        setBreadcrumbs([category]);
      }
      setSelectedProduct(null);
    } else if (decodedProductName && !category) {
      const foundProduct = allProducts.find(
        (item) => item.product.name === decodedProductName
      );
      if (foundProduct) {
        setSelectedProduct(foundProduct);
        setSelectedCategory(foundProduct.product.type);
        setBreadcrumbs([foundProduct.product.type]);
      } else {
        setSelectedProduct(null);
        setSelectedCategory(null);
        setBreadcrumbs([]);
      }
    } else if (category && decodedProductName) {
      const foundProduct = allProducts.find(
        (item) =>
          item.product.name === decodedProductName &&
          item.product.type === category
      );
      if (foundProduct) {
        setSelectedProduct(foundProduct);
        setSelectedCategory(category);
        setBreadcrumbs([category]);
      } else {
        setSelectedProduct(null);
        setBreadcrumbs([category]);
      }
    } else {
      setSelectedCategory(null);
      setSelectedProduct(null);
      setDisplayedGoods(allProducts);
      setBreadcrumbs([]);
    }
  }, [category, productName, allProducts]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    if (category === "Новинки") {
      setDisplayedGoods(
        allProducts.filter((item) => item.product.status === true)
      );
    } else if (category === "Акции") {
      setDisplayedGoods(allProducts.filter((item) => item.product.is_on_sale));
    } else {
      setDisplayedGoods(
        allProducts.filter((item) => item.product.type === category)
      );
    }
    setBreadcrumbs([category]);
    navigate(`/product/${category}`);
  };

  const handleNavigateBack = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
      navigate(`/product/${selectedCategory}`);
    } else {
      setSelectedCategory(null);
      setBreadcrumbs([]);
      setDisplayedGoods(allProducts);
      navigate("/product");
    }
  };
  const handleBreadcrumbClick = (index: number) => {
    if (index === 0 && selectedCategory) {
      setSelectedProduct(null);
      setBreadcrumbs([selectedCategory]);
      setDisplayedGoods(
        allProducts.filter((item) => item.product.type === selectedCategory)
      );
      navigate(`/product/${selectedCategory}`);
    }
  };
  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setBreadcrumbs([product.product.type]);
    navigate(
      `/product/${product.product.type}/${encodeURIComponent(
        product.product.name
      )}`
    );
  };

  return (
    <div className="pb-40">
      <div className="flex">
        <CategoriesMenu
          categories={[
            "Новинки",
            ...Array.from(
              new Set(allProducts.map((item) => item.product.type || "Другие"))
            ),
            "Акции",
          ]}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
        <div className="flex-1 p-5 ml-20">
          {breadcrumbs.length > 0 && (
            <Breadcrumbs
              path={breadcrumbs}
              onNavigateBack={handleNavigateBack}
              onBreadcrumbClick={handleBreadcrumbClick}
            />
          )}

          {selectedProduct ? (
            <ProductDetail
              product={selectedProduct.product}
              id_product={selectedProduct.id}
              file_product={selectedProduct.file}
            />
          ) : (
            <>
              <h1 className="text-main font-semibold text-3xl font-montserrat mb-8">
                {selectedCategory ? selectedCategory : "Все товары"}
              </h1>
              <div className="grid grid-cols-3 gap-10">
                {displayedGoods.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleProductClick(item)}
                    className="text-left border border-[#D9D9D9] w-[300px] cursor-pointer hover:shadow-2xl "
                  >
                    <img
                      src={item.file}
                      alt={item.product.name}
                      className="w-[300px] h-72 object-cover "
                    />
                    <p className="text-black mt-4 font-montserrat font-normal text-sm px-3">
                      {item.product.smallDescription}
                    </p>
                    <p className="text-black font-montserrat font-semibold text-sm mt-2 px-3">
                      {item.product.name}
                    </p>

                    {item.product.is_on_sale ? (
                      <div className="px-3">
                        <p className="text-red-500 font-montserrat font-semibold text-sm line-through">
                          {item.product.price} ₽
                        </p>
                        <p className="text-black font-montserrat font-semibold text-lg">
                          {item.product.sale_price} ₽
                        </p>
                      </div>
                    ) : (
                      <p className="text-black text-right font-montserrat font-semibold text-lg mt-1 mb-2 px-3">
                        {item.product.price} ₽
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllGoods;
