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

type Product = RegularProduct;

const ProductForm: React.FC<{
  item: Product | null;
  type: 'Добавить' | 'Редактировать';
  onSubmit: (item: Product) => void;
  onCancel: () => void;
}> = ({ item, type, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Product>(
    item || {
      imgSrc: '',
      imgSrcList: [],
      description: '',
      name: '',
      price: '',
      category: '',
      fullDescription: '',
      composition: '',
      application: '',
      isNew: false,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, key: 'imgSrc' | 'imgSrcList') => {
    const files = e.target.files;
    if (!files) return;

    if (key === 'imgSrc') {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, imgSrc: reader.result as string });
      };
      reader.readAsDataURL(file);
    } else {
      const fileArray = Array.from(files).map(file => {
        const reader = new FileReader();
        return new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(fileArray).then(images => {
        setFormData({ ...formData, imgSrcList: images });
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h3 className="text-lg font-bold mb-2">{type} Товар</h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Название"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Цена"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Категория"
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
        name="fullDescription"
        value={formData.fullDescription}
        onChange={handleChange}
        placeholder="Полное описание"
        className="border p-2 mb-2 w-full"
      />
      <textarea
        name="composition"
        value={formData.composition}
        onChange={handleChange}
        placeholder="Состав"
        className="border p-2 mb-2 w-full"
      />
      <textarea
        name="application"
        value={formData.application}
        onChange={handleChange}
        placeholder="Способ применения"
        className="border p-2 mb-2 w-full"
      />

      {/* Image upload for main image */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Изображение</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 'imgSrc')}
          className="mt-1 block w-full text-sm text-gray-500"
        />
        {formData.imgSrc && <img src={formData.imgSrc} alt="Main" className="mt-2 max-h-48" />}
      </div>

      {/* Image upload for additional images */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Дополнительные изображения</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleImageChange(e, 'imgSrcList')}
          className="mt-1 block w-full text-sm text-gray-500"
        />
        {formData.imgSrcList.map((imgSrc, index) => (
          <img key={index} src={imgSrc} alt={`Дополнительное ${index + 1}`} className="mt-2 max-h-32" />
        ))}
      </div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
        Сохранить
      </button>
      <button type="button" onClick={onCancel} className="bg-red-500 text-white px-4 py-2 rounded">
        Отмена
      </button>
    </form>
  );
};

export default ProductForm;
