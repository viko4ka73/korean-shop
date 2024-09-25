import React, { useState, useEffect } from "react";
import { Product } from "../../api";

const EditProductForm: React.FC<{
  item: Product | null;
  onSubmit: (item: FormData) => void;
  onCancel: () => void;
}> = ({ item, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Product>({
    id: "",
    name: "",
    smallDescription: "",
    description: "",
    application: "",
    structure: "",
    price: 0,
    type: "",
    status: false,
    is_on_sale: false,
    sale_price: 0,
    file: null,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Load selected item into formData when item changes
  useEffect(() => {
    if (item) {
      setFormData({
        ...item,
        sale_price: item.sale_price || 0,
        file: null, // Do not preload the file field
      });
      setSelectedFile(null); // Reset the file input field
    }
  }, [item]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "sale_price" ? parseFloat(value) : value,
    });
  };

  const handleBooleanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setFormData({ ...formData, file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    const appendToFormData = (key: string, value: any) => {
      if (value !== undefined && value !== null) {
        data.append(key, value.toString());
      }
    };

    appendToFormData("id", formData.id);
    appendToFormData("name", formData.name);
    appendToFormData("smallDescription", formData.smallDescription);
    appendToFormData("description", formData.description);
    appendToFormData("application", formData.application);
    appendToFormData("structure", formData.structure);
    appendToFormData("price", formData.price);
    appendToFormData("type", formData.type);
    appendToFormData("status", formData.status ? "true" : "false");
    appendToFormData("is_on_sale", formData.is_on_sale ? "true" : "false");
    appendToFormData("sale_price", formData.sale_price);

    if (selectedFile) {
      data.append("file", selectedFile);
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h3 className="text-lg font-bold mb-2">Редактировать товар</h3>
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="ID товара"
        className="border p-2 mb-2 w-full"
        required
        disabled // Disable ID field for editing
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Название"
        className="border p-2 mb-2 w-full"
      />
      <textarea
        name="smallDescription"
        value={formData.smallDescription}
        onChange={handleChange}
        placeholder="Краткое описание"
        className="border p-2 mb-2 w-full"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Описание"
        className="border p-2 mb-2 w-full"
      />
      <textarea
        name="application"
        value={formData.application}
        onChange={handleChange}
        placeholder="Применение"
        className="border p-2 mb-2 w-full"
      />
      <textarea
        name="structure"
        value={formData.structure}
        onChange={handleChange}
        placeholder="Состав"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Цена"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Тип"
        className="border p-2 mb-2 w-full"
      />
      <label className="block mb-2">
        <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={handleBooleanChange}
        />
        Активный
      </label>
      <label className="block mb-2">
        <input
          type="checkbox"
          name="is_on_sale"
          checked={formData.is_on_sale}
          onChange={handleBooleanChange}
        />
        На распродаже
      </label>
      <input
        type="number"
        name="sale_price"
        value={formData.sale_price}
        onChange={handleChange}
        placeholder="Цена распродажи"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="border p-2 mb-2 w-full"
      />
      <div className="flex space-x-4">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
          Обновить товар
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white"
        >
          Отменить
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;
