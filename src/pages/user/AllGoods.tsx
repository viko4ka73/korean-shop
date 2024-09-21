
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CategoriesMenu from '../../components/user/products/CategoriesMenu';
import Breadcrumbs from '../../components/user/products/Breadcrumbs';
import { goods, promotions, Product } from '../../constants'; 
import { ProductDetail } from '../../components/user/products';

const AllGoods = () => {
  const { category, productName } = useParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [displayedGoods, setDisplayedGoods] = useState<Product[]>(goods);

  useEffect(() => {
    const decodedProductName = productName ? decodeURIComponent(productName) : null;

    if (category && !decodedProductName) {
      if (category === 'Новинки') {
        setSelectedCategory(category);
        setDisplayedGoods(goods.filter(item => item.isNew));
        setBreadcrumbs(['Новинки']);
      } else if (category === 'Акции') {
        setSelectedCategory(category);
        setDisplayedGoods(promotions);
        setBreadcrumbs(['Акции']);
      } else {
        setSelectedCategory(category);
        setDisplayedGoods(goods.filter(item => item.category === category));
        setBreadcrumbs([category]);
      }
      setSelectedProduct(null);
    } else if (decodedProductName && !category) {
      const foundProduct = goods.find(item => item.name === decodedProductName) || promotions.find(item => item.name === decodedProductName);
      if (foundProduct) {
        setSelectedProduct(foundProduct);
        setSelectedCategory(foundProduct.category);
        setBreadcrumbs([foundProduct.category]);
      } else {
        setSelectedProduct(null);
        setSelectedCategory(null);
        setBreadcrumbs([]);
      }
    } else if (category && decodedProductName) {
      const foundProduct = goods.find(item => item.name === decodedProductName && item.category === category) || promotions.find(item => item.name === decodedProductName && item.category === category);
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
      setDisplayedGoods(goods);
      setBreadcrumbs([]);
    }
  }, [category, productName]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    if (category === 'Новинки') {
      setDisplayedGoods(goods.filter(item => item.isNew));
    } else if (category === 'Акции') {
      setDisplayedGoods(promotions);
    } else {
      setDisplayedGoods(goods.filter(item => item.category === category));
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
      setDisplayedGoods(goods);
      navigate('/product');
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === 0 && selectedCategory) {
      setSelectedProduct(null);
      setBreadcrumbs([selectedCategory]);
      setDisplayedGoods(goods.filter(item => item.category === selectedCategory));
      navigate(`/product/${selectedCategory}`);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setBreadcrumbs([product.category]);
    navigate(`/product/${product.category}/${encodeURIComponent(product.name)}`);
  };

  return (
    <div className="pb-40">
      <div className="flex">
        <CategoriesMenu
          categories={['Новинки', ...Array.from(new Set(goods.map(item => item.category || 'Другие'))), 'Акции']}
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
            <ProductDetail product={selectedProduct} />
          ) : (
            <>
              <h1 className="text-main font-semibold text-3xl font-montserrat mb-8">
                {selectedCategory ? selectedCategory : 'Все товары'}
              </h1>
              <div className="grid grid-cols-3 gap-10">
                {displayedGoods.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleProductClick(item)}
                    className="text-left border border-[#D9D9D9] w-[300px] cursor-pointer hover:shadow-2xl"
                  >
                    <img
                      src={item.imgSrc}
                      alt={item.name}
                      className="w-[300px] h-72 object-cover"
                    />
                    <p className="text-black mt-4 font-montserrat font-normal text-sm px-3">
                      {item.description}
                    </p>
                    <p className="text-black font-montserrat font-semibold text-sm mt-2 px-3">
                      {item.name}
                    </p>
                    {'oldPrice' in item && 'newPrice' in item ? (
                      <div className="px-3">
                        <p className="text-red-500 font-montserrat font-semibold text-sm line-through">
                          {item.oldPrice}
                        </p>
                        <p className="text-black font-montserrat font-semibold text-lg">
                          {item.newPrice}
                        </p>
                      </div>
                    ) : (
                      <p className="text-black text-right font-montserrat font-semibold text-lg mt-1 mb-2 px-3">
                        {item.price}
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
