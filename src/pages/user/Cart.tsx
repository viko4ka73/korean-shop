import React, { useState, useEffect } from "react";
import { useCart } from "../../sections/CartContext";
import axios from "axios";
import { SERVER_API_REMOTE_URL } from "../../api";

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
  });
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const { updateCartCount } = useCart();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
    updateCartCount(); // Update count initially
  }, [updateCartCount]);

  const handleQuantityChange = (index: number, delta: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = Math.max(
      (updatedCart[index].quantity || 1) + delta,
      1
    ); // Ensure minimum quantity is 1
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartCount();
  };

  const handleRemoveItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartCount();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleDeliveryMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryMethod(e.target.value);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  const handleOrderSubmit = async () => {
    const orderItems = cartItems.map((item) => {
      const total_price = item.price * (item.quantity || 1);

      const orderItem = {
        product_id: item.product_id,
        price: Number(item.price),
        quantity: Number(item.quantity),
        total_price: total_price,
        customer_name: customerInfo.fullName || "string",
        delivery: deliveryMethod === "delivery",
        note: `${customerInfo.note || "string"}\nТелефон: ${
          customerInfo.phone
        }\nАдрес: ${
          deliveryMethod === "delivery" ? customerInfo.address : "не указан"
        }`,
      };

      console.log("Current order item:", orderItem);

      return orderItem;
    });

    const orderPayload = {
      order: orderItems,
    };

    console.log(
      "Order payload being sent:",
      JSON.stringify(orderPayload, null, 2)
    );

    try {
      const response = await axios.post(
        `${SERVER_API_REMOTE_URL}/orders/`,
        orderPayload
      );
      console.log("Order submitted successfully:", response.data);
      localStorage.removeItem("cart");
      setCartItems([]);
      updateCartCount();
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const subtotal = calculateSubtotal();
  const shippingCost = subtotal >= 5000 ? 0 : 300; // Бесплатная доставка при сумме более 5000
  const total = subtotal + (deliveryMethod === "delivery" ? shippingCost : 0); // Стоимость доставки учитывается только при выборе доставки

  return (
    <div className="h-screen py-8 mt-1-">
      <div className="container mx-auto px-4">
        <h1 className="text-black font-montserrat font-semibold text-xl mb-6">
          Корзина
        </h1>
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 font-montserrat text-lg">
            Ваша корзина пуста. Добавьте товары, чтобы оформить заказ.
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md border p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-black font-montserrat font-semibold text-sm">
                        Товар
                      </th>
                      <th className="text-left text-black font-montserrat font-semibold text-sm">
                        Цена
                      </th>
                      <th className="text-left text-black font-montserrat font-semibold text-sm">
                        Количество
                      </th>
                      <th className="text-left text-black font-montserrat font-semibold text-sm">
                        Итого
                      </th>
                      <th className="text-left text-black font-montserrat font-semibold text-sm">
                        {" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-4">
                          <div className="flex items-center">
                            <img
                              className="h-16 w-16 mr-4 rounded"
                              src={item.imgSrc}
                              alt="Product"
                            />
                            <span className="text-black font-montserrat font-semibold text-sm">
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 text-black font-montserrat font-semibold text-sm">
                          {item.price} р
                        </td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <button
                              className="border border-main rounded-md py-1 px-3 text-black hover:bg-purple-100"
                              onClick={() => handleQuantityChange(index, -1)}
                            >
                              -
                            </button>
                            <span className="text-center w-8 text-black font-montserrat font-semibold text-sm">
                              {item.quantity || 1}
                            </span>
                            <button
                              className="border border-main rounded-md py-1 px-3 text-black hover:text-main"
                              onClick={() => handleQuantityChange(index, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4 text-black">
                          {(item.price * (item.quantity || 1)).toFixed(2)} р
                        </td>
                        <td className="py-4 text-black">
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => handleRemoveItem(index)}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-white border rounded-lg shadow-md p-6 mb-4">
                <h2 className="text-black font-montserrat font-semibold text-lg mb-4">
                  Итого
                </h2>
                <div className="flex justify-between mb-2">
                  <span className="text-black">Сумма:</span>
                  <span className="text-black">{subtotal.toFixed(2)} р</span>
                </div>
                {deliveryMethod === "delivery" && (
                  <div className="flex justify-between mb-2">
                    <span className="text-black">Доставка:</span>
                    <span className="text-black">{shippingCost} р</span>
                  </div>
                )}
                <div className="flex justify-between mb-4 font-semibold">
                  <span className="text-black">Всего:</span>
                  <span className="text-black">{total.toFixed(2)} р</span>
                </div>
                <h2 className="text-black font-montserrat font-semibold text-lg mb-4">
                  Данные покупателя
                </h2>
                <input
                  className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                  type="text"
                  name="fullName"
                  placeholder="ФИО"
                  value={customerInfo.fullName}
                  onChange={handleInputChange}
                />
                <input
                  className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                  type="text"
                  name="phone"
                  placeholder="Телефон"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                />
                <textarea
                  className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                  name="note"
                  placeholder="Заметка"
                  value={customerInfo.note}
                  onChange={handleInputChange}
                />
                {deliveryMethod === "delivery" && (
                  <input
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                    type="text"
                    name="address"
                    placeholder="Адрес"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                  />
                )}

                <div className="mb-4">
                  <h3 className="text-black font-montserrat font-semibold text-md mb-2">
                    Способ доставки
                  </h3>
                  <label className="block">
                    <input
                      type="radio"
                      value="pickup"
                      checked={deliveryMethod === "pickup"}
                      onChange={handleDeliveryMethodChange}
                    />
                    Самовывоз
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      value="delivery"
                      checked={deliveryMethod === "delivery"}
                      onChange={handleDeliveryMethodChange}
                    />
                    Доставка
                  </label>
                </div>
                <button
                  onClick={handleOrderSubmit}
                  className="bg-main text-white font-montserrat py-2 px-4 rounded-md"
                >
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
