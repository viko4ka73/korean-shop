import React, { useState } from 'react';

interface RegularProduct {
  imgSrc: string;
  imgSrcList: string[];
  description: string;
  name: string;
  price: string;
  category: string;
  fullDescription: string;
  composition: string;
  application: string;
  isNew: boolean;
}

interface PromotionalProduct {
  imgSrc: string;
  imgSrcList: string[];
  description: string;
  name: string;
  oldPrice: string;
  newPrice: string;
  category: string;
  fullDescription: string;
  composition: string;
  application: string;
  isNew: boolean;
}

interface PromotionTableProps {
  data: PromotionalProduct[];
  products: RegularProduct[];
  onEdit: (item: PromotionalProduct) => void;
  onDelete: (name: string) => void;
  onAddNew: (item: PromotionalProduct) => void;
}

const PromotionTable: React.FC<PromotionTableProps> = ({ data, products, onEdit, onDelete, onAddNew }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<RegularProduct | null>(null);
  const [selectedPromotion, setSelectedPromotion] = useState<PromotionalProduct | null>(null);
  const [newPrice, setNewPrice] = useState('');

  const handleAddNewClick = () => {
    setIsFormOpen(true);
    setIsEditOpen(false);
    setSelectedProduct(null);
    setNewPrice('');
  };

  const handleEditClick = (promotion: PromotionalProduct) => {
    setSelectedPromotion(promotion);
    setNewPrice(promotion.newPrice);
    setIsEditOpen(true);
    setIsFormOpen(false);
  };

  const handleFormSubmit = () => {
    if (selectedProduct && newPrice) {
      const promotionalProduct: PromotionalProduct = {
        ...selectedProduct,
        oldPrice: selectedProduct.price, // Use the existing product price as old price
        newPrice,
      };
      onAddNew(promotionalProduct);
      setIsFormOpen(false);
      setSelectedProduct(null);
      setNewPrice('');
    }
  };

  const handleEditSubmit = () => {
    if (selectedPromotion && newPrice) {
      const updatedPromotion = { ...selectedPromotion, newPrice };
      onEdit(updatedPromotion);
      setIsEditOpen(false);
      setSelectedPromotion(null);
      setNewPrice('');
    }
  };

  return (
    <div>
      <button onClick={handleAddNewClick} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
        Добавить новую акцию
      </button>

      {isFormOpen && (
        <div className="mb-4 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Добавить акционный товар</h3>
          <select
            value={selectedProduct?.name || ''}
            onChange={(e) => {
              const product = products.find(p => p.name === e.target.value);
              setSelectedProduct(product || null);
            }}
            className="border p-2 mb-2 w-full"
          >
            <option value="">Выберите товар</option>
            {products.map(product => (
              <option key={product.name} value={product.name}>
                {product.name} - {product.price}
              </option>
            ))}
          </select>

          {selectedProduct && (
            <div className="mb-2">
              <input
                type="text"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="Новая цена"
                className="border p-2 w-full"
              />
            </div>
          )}

          <button onClick={handleFormSubmit} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
            Сохранить
          </button>
          <button onClick={() => setIsFormOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded">
            Отмена
          </button>
        </div>
      )}

      {isEditOpen && selectedPromotion && (
        <div className="mb-4 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Редактировать акционный товар</h3>
          <div className="mb-2">
            <p className="font-semibold">{selectedPromotion.name}</p>
            <input
              type="text"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="Новая цена"
              className="border p-2 w-full"
            />
          </div>

          <button onClick={handleEditSubmit} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
            Сохранить изменения
          </button>
          <button onClick={() => setIsEditOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded">
            Отмена
          </button>
        </div>
      )}

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Название</th>
            <th className="py-2">Старая цена</th>
            <th className="py-2">Новая цена</th>
            <th className="py-2">Категория</th>
            <th className="py-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.name}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.oldPrice}</td>
              <td className="border px-4 py-2">{item.newPrice}</td>
              <td className="border px-4 py-2">{item.category}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEditClick(item)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  Редактировать
                </button>
                <button onClick={() => onDelete(item.name)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PromotionTable;
