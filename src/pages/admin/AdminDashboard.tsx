import { useEffect, useState } from "react";
import {
  ProductTable,
  FeedbackTable,
  OrdersTable,
  ProductForm,
  EditProductForm,
} from "../../components/admin";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  Product,
} from "../../api";
import { useAuth } from "../../sections/AuthProvider";

const AdminDashboard = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("Товары");
  const [productData, setProductData] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (isAuthenticated) {
          const response = await getProducts();
          setProductData(response);
        } else {
          console.error("User is not authenticated");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [isAuthenticated]);

  const handleFormSubmit = async (
    formData: FormData
  ): Promise<Product | undefined> => {
    try {
      if (!isAuthenticated) {
        throw new Error("User is not authenticated");
      }

      let response: Product;

      if (selectedProduct) {
        response = await updateProduct(selectedProduct.id, formData);
      } else {
        response = await createProduct(formData);
      }

      if (response) {
        setProductData((prevData) => {
          return selectedProduct
            ? prevData.map((p) => (p.id === selectedProduct.id ? response : p))
            : [...prevData, response];
        });
        setIsEditFormOpen(false);
        setSelectedProduct(null);
        setIsCreateFormOpen(false);
      }

      return response;
    } catch (error: any) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      alert(
        "An error occurred while submitting the form: " +
          (error.response?.data?.message || error.message)
      );
      return undefined;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (!isAuthenticated) {
        throw new Error("User is not authenticated");
      }

      await deleteProduct(id);
      setProductData(productData.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Произошла ошибка при удалении товара.");
    }
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsCreateFormOpen(true);
  };

  const handleEdit = (item: Product) => {
    setSelectedProduct(item);
    setIsEditFormOpen(true);
  };

  if (!isAuthenticated) {
    return <div>Please log in to access the Admin Dashboard.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Административная панель</h1>
      <button className="mb-4 px-4 py-2 bg-red-500 text-white">
        <a href="/">Logout</a>
      </button>
      <div className="flex space-x-4 mb-4">
        {["Товары", "Feedback", "Заказы"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 border ${
              activeTab === tab ? "bg-gray-200" : "bg-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {isCreateFormOpen && (
        <ProductForm
          item={null}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsCreateFormOpen(false)}
        />
      )}

      {isEditFormOpen && selectedProduct && (
        <EditProductForm
          item={selectedProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsEditFormOpen(false)}
        />
      )}
      {activeTab === "Товары" && !isEditFormOpen && !isCreateFormOpen && (
        <ProductTable
          data={productData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddNew={handleAddNew}
        />
      )}

      {activeTab === "Feedback" && <FeedbackTable />}
      {activeTab === "Заказы" && <OrdersTable />}
    </div>
  );
};

export default AdminDashboard;
