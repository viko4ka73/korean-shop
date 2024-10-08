import React, { useState, useEffect } from "react";
import { Product } from "../../api";

const ProductForm: React.FC<{
  item: Product | null;
  onSubmit: (item: FormData) => void;
  onCancel: () => void;
}> = ({ item, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Product>({
    id: item?.id || "",
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setFormData({
        ...item,
        sale_price: item.sale_price || 0,
        file: null,
      });
      setSelectedFile(null);
      setImagePreview(null); // Reset image preview when item changes
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

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null); // Clear preview if no file is selected
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.file && !item) {
      alert("Файл обязателен для нового товара.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("smallDescription", formData.smallDescription);
    data.append("description", formData.description);
    data.append("application", formData.application);
    data.append("structure", formData.structure);
    data.append("price", formData.price.toString());
    data.append("type", formData.type);
    data.append("status", formData.status ? "true" : "false");
    data.append("is_on_sale", formData.is_on_sale ? "true" : "false");
    data.append("sale_price", formData.sale_price.toString());

    if (formData.file) {
      data.append("file", formData.file);
    }

    console.log(formData);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h3 className="text-lg font-bold mb-2">
        {item ? "Обновить товар" : "Добавить товар"}
      </h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Название"
        className="border p-2 mb-2 w-full"
        required
      />
      <textarea
        name="smallDescription"
        value={formData.smallDescription}
        onChange={handleChange}
        placeholder="Краткое описание"
        className="border p-2 mb-2 w-full"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Описание"
        className="border p-2 mb-2 w-full"
        required
      />
      <textarea
        name="application"
        value={formData.application}
        onChange={handleChange}
        placeholder="Применение"
        className="border p-2 mb-2 w-full"
        required
      />
      <textarea
        name="structure"
        value={formData.structure}
        onChange={handleChange}
        placeholder="Состав"
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Цена"
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="text"
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Тип"
        className="border p-2 mb-2 w-full"
        required
      />
      <label className="block mb-2">
        <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={handleBooleanChange}
        />
        Новинка
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
        required={!item} // Make file required only for new products
      />
      {imagePreview && (
        <div className="mb-2">
          <img
            src={imagePreview}
            alt="Превью изображения"
            className="w-64 h-64 object-cover"
          />
        </div>
      )}
      <div className="flex space-x-4">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
          Добавить товар
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

export default ProductForm;
