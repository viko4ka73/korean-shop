import React from 'react';

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

interface ProductTableProps {
  data: RegularProduct[];
  onEdit: (item: RegularProduct) => void;
  onDelete: (name: string) => void;
  onAddNew: () => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ data, onEdit, onDelete, onAddNew }) => {
  return (
    <div>
      <button onClick={onAddNew} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">Добавить новый товар</button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Название</th>
            <th className="py-2">Цена</th>
            <th className="py-2">Категория</th>
            <th className="py-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.name}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.price}</td>
              <td className="border px-4 py-2">{item.category}</td>
              <td className="border px-4 py-2">
                <button onClick={() => onEdit(item)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
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

export default ProductTable;
