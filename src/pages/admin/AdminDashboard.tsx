import React, { useState } from 'react';
import { goods, promotions, RegularProduct, PromotionalProduct } from '../../constants'; // Adjust import paths as necessary
import { ProductForm, ProductTable, PromotionTable } from '../../components/admin';

type Product = RegularProduct | PromotionalProduct;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Товары');
  const [productData, setProductData] = useState<RegularProduct[]>(goods);
  const [promotionData, setPromotionData] = useState<PromotionalProduct[]>(promotions);
  const [selectedProduct, setSelectedProduct] = useState<RegularProduct | null>(null); // Ensure type is RegularProduct
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsFormOpen(false); // Close form when changing tabs
  };

  const handleEdit = (item: Product) => {
    if ('price' in item) { // Ensuring that only RegularProduct is edited in ProductForm
      setSelectedProduct(item);
      setIsFormOpen(true);
    } 
    // No form edit needed for promotions here
  };

  const handleDelete = (name: string) => {
    if (activeTab === 'Товары') {
      setProductData(productData.filter(item => item.name !== name));
    } else if (activeTab === 'Акции') {
      setPromotionData(promotionData.filter(item => item.name !== name));
    }
  };

  const handleFormSubmit = (item: RegularProduct) => {
    if (selectedProduct) {
      setProductData(productData.map(p => (p.name === selectedProduct.name ? item : p)));
    } else {
      setProductData([...productData, item]);
    }
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-4">
        {['Товары', 'Акции', 'Feedback', 'Заказы'].map(tab => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-4 py-2 border ${activeTab === tab ? 'bg-gray-200' : 'bg-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isFormOpen ? (
        <ProductForm
          item={selectedProduct}
          type={selectedProduct ? 'Редактировать' : 'Добавить'}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      ) : (
        <>
          {activeTab === 'Товары' && (
            <ProductTable
              data={productData}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddNew={handleAddNew}
            />
          )}
          {activeTab === 'Акции' && (
            <PromotionTable
              data={promotionData}
              products={productData}
              onEdit={(item) => handleEdit(item)}
              onDelete={handleDelete}
              onAddNew={(promo) => setPromotionData([...promotionData, promo])}
            />
          )}
          {activeTab === 'Feedback' && (
            <div>Feedback Table (Placeholder)</div>
          )}
          {activeTab === 'Заказы' && (
            <div>Orders Table (Placeholder)</div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
