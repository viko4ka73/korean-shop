import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export interface SignInData {
  username: string;
  password: string;
}

export interface Product {
  id: string;
  name: string;
  smallDescription: string;
  description: string;
  application: string;
  structure: string;
  price: number;
  type: string;
  status: boolean;
  is_on_sale: boolean;
  sale_price: number;
  file?: File | null;
}

export interface Feedback {
  fullname: string;
  email: string;
  description: string;
  phone: string;
}

export interface Order {
  product_id: number;
  price: number;
  quantity: number;
  total_price: number;
  customer_name: string;
  delivery: boolean;
  note: string;
}

export const SERVER_API_REMOTE_URL = `http://127.0.0.1:8000/api_version_1`;

// Функция для входа
export const signIn = async (data: SignInData): Promise<any> => {
  try {
    const url = `${SERVER_API_REMOTE_URL}/admins/sign_in`;
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", data.username);
    formData.append("password", data.password);

    const response: AxiosResponse = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Функция для получения списка продуктов
export const getProducts = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${SERVER_API_REMOTE_URL}/product/gets/`, {
      withCredentials: true,
    });

    return response.data.products.all_products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Функция для создания продукта
export const createProduct = async (formData: FormData): Promise<Product> => {
  try {
    const token = Cookies.get("access_token");
    if (!token) {
      throw new Error("Token is missing");
    }

    const response = await axios.post<Product>(
      `${SERVER_API_REMOTE_URL}/product/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    console.log("Product created successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Функция для обновления продукта
export const updateProduct = async (
  id: string,
  formData: FormData
): Promise<Product> => {
  try {
    const token = Cookies.get("access_token");
    if (!token) {
      throw new Error("Token is missing");
    }
    const response = await axios.put<Product>(
      `${SERVER_API_REMOTE_URL}/product/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    console.log("Product updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Функция для удаления продукта
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const token = Cookies.get("access_token");
    if (!token) {
      throw new Error("Token is missing");
    }

    const response = await axios.delete(
      `${SERVER_API_REMOTE_URL}/product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    console.log("Product deleted successfully", response.status);
  } catch (error) {
    console.error("Error deleting product:");
    throw error;
  }
};

// Функция для получения фидбека
export const getFeedbacks = async (): Promise<Feedback[]> => {
  const token = Cookies.get("access_token");
  if (!token) {
    throw new Error("Token is missing");
  }

  try {
    const response = await fetch(`${SERVER_API_REMOTE_URL}/feedback/gets/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Failed to fetch feedbacks: ${response.status} ${response.statusText} - ${errorMessage}`
      );
    }
    const data = await response.json();
    return data.feedbacks;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    throw error;
  }
};

// Функция для получения заказов
export const getOrders = async (): Promise<Order[]> => {
  const token = Cookies.get("access_token");
  if (!token) {
    throw new Error("Token is missing");
  }

  const response = await fetch(`${SERVER_API_REMOTE_URL}/orders/gets/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  const data = await response.json();
  return data.orders;
};
