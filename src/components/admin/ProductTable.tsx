import React, { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  Product,
  deleteProduct,
} from "../../api";
import { useAuth } from "../../sections/AuthProvider";

const ProductTable: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    smallDescription: "",
    description: "",
    application: "",
    price: 0,
    structure: "",
    type: "",
    status: true,
    is_on_sale: false,
    sale_price: 0,
    file: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Для отображения превью изображения

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      if (!isAuthenticated) {
        throw new Error("User is not authenticated");
      }

      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Произошла ошибка при удалении товара.");
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (isEditing && currentProductId) {
        const updatedProduct = await updateProduct(
          currentProductId,
          newProduct
        );
        setProducts(
          products.map((product) =>
            product.id === currentProductId ? updatedProduct : product
          )
        );
        setIsEditing(false);
        setCurrentProductId(null);
      } else {
        const createdProduct = await createProduct(newProduct);
        setProducts([...products, createdProduct]);
        setIsAdding(false);
      }

      setNewProduct({
        name: "",
        smallDescription: "",
        description: "",
        application: "",
        price: 0,
        structure: "",
        type: "",
        status: true,
        is_on_sale: false,
        sale_price: 0,
        file: null,
      });
      setImagePreview(null);
    } catch (error) {
      console.error(
        isEditing ? "Error updating product:" : "Error creating product:",
        error
      );
      alert("Произошла ошибка при добавлении или обновлении товара.");
    }
  };

  const handleEdit = (product: Product) => {
    setIsEditing(true);
    setIsAdding(false);
    setCurrentProductId(product.id!);
    setNewProduct(product);
    setImagePreview(
      product.file ? `data:image/png;base64,${product.file}` : null
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProduct({ ...newProduct, file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setIsAdding(true);
          setIsEditing(false);
          setCurrentProductId(null);
          setImagePreview(null);
        }}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Добавить новый товар
      </button>

      {(isAdding || isEditing) && (
        <div className="mb-4">
          <h2 className="text-xl mb-2">
            {isEditing ? "Редактировать продукт" : "Создать новый продукт"}
          </h2>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Название"
              value={newProduct.name || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="border p-2 w-full"
            />
            <input
              type="text"
              placeholder="Краткое описание"
              value={newProduct.smallDescription || ""}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  smallDescription: e.target.value,
                })
              }
              className="border p-2 w-full"
            />
            <input
              type="text"
              placeholder="Полное описание"
              value={newProduct.description || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="border p-2 w-full"
            />
            <input
              type="text"
              placeholder="Применение"
              value={newProduct.application || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, application: e.target.value })
              }
              className="border p-2 w-full"
            />
            <input
              type="number"
              placeholder="Цена"
              value={newProduct.price || 0}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: parseFloat(e.target.value),
                })
              }
              className="border p-2 w-full"
            />
            <input
              type="text"
              placeholder="Состав"
              value={newProduct.structure || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, structure: e.target.value })
              }
              className="border p-2 w-full"
            />
            <input
              type="text"
              placeholder="Тип"
              value={newProduct.type || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, type: e.target.value })
              }
              className="border p-2 w-full"
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newProduct.status}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, status: e.target.checked })
                }
                className="mr-2"
              />
              Новинка
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newProduct.is_on_sale}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, is_on_sale: e.target.checked })
                }
                className="mr-2"
              />
              Распродажа
            </label>
            <input
              type="number"
              placeholder="Цена на распродаже"
              value={newProduct.sale_price || 0}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  sale_price: parseFloat(e.target.value),
                })
              }
              className="border p-2 w-full"
            />

            {imagePreview && (
              <div className="mb-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover"
                />
              </div>
            )}

            <input
              type="file"
              onChange={handleImageChange}
              className="border p-2 w-full"
            />

            <div className="flex justify-start space-x-2 mt-4">
              <button
                onClick={handleCreateOrUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                {isEditing ? "Сохранить" : "Создать"}
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setIsEditing(false);
                  setCurrentProductId(null);
                  setImagePreview(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

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
          {products.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.product.name}</td>
              <td className="border px-4 py-2">{item.product.price}</td>
              <td className="border px-4 py-2">{item.product.type}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => {
                    if (item.id) {
                      handleDelete(item.id);
                    } else {
                      console.error("Product ID is missing");
                    }
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
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
