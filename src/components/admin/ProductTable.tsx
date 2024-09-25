import { useState, useEffect } from "react";
import { getProducts, Product, deleteProduct } from "../../api"; // Import deleteProduct

interface ProductTableProps {
  data: Product[];
  onEdit: (item: Product) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  onEdit,
  onDelete,
  onAddNew,
}) => {
  const [products, setProducts] = useState<any[]>([]);

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
    if (!id) {
      console.error("Product ID is missing!");
      return;
    }

    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Произошла ошибка при удалении товара.");
    }
  };

  return (
    <div>
      <button
        onClick={onAddNew}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Добавить новый товар
      </button>
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
              <td className="border px-4 py-2">{item.product.name}</td>{" "}
              {/* Access nested product name */}
              <td className="border px-4 py-2">{item.product.price}</td>{" "}
              {/* Access nested product price */}
              <td className="border px-4 py-2">{item.product.type}</td>{" "}
              {/* Access nested product type */}
              <td className="border px-4 py-2">
                <button
                  onClick={() => onEdit(item)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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
